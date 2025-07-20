import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import type { UserData } from "../types/UserData";

const UserProfile: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!uid) return;

    const fetchUserData = async () => {
      try {
        const db = getFirestore(app);
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  if (loading) return <div className="p-6">Loading profile...</div>;

  if (!userData)
    return <div className="p-6">User not found or profile does not exist.</div>;

  const isOwnProfile = currentUser?.uid === uid;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isOwnProfile ? "Your Profile" : "Profile"}
      </h1>

      {userData.photoURL && (
        <img
          src={userData.photoURL}
          alt={`${userData.displayName ?? "User"}'s profile`}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
      )}

      <p>
        <strong>Display Name:</strong> {userData.displayName ?? "N/A"}
      </p>

      <p>
        <strong>Full Name:</strong>{" "}
        {userData.firstName ?? ""} {userData.lastName ?? ""}
      </p>

      <p>
        <strong>Email:</strong> {userData.email ?? "N/A"}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {userData.city ? `${userData.city}, ` : ""}
        {userData.country ?? ""}
      </p>

      {userData.linkedIn && (
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href={userData.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {userData.linkedIn}
          </a>
        </p>
      )}

      {userData.skills && userData.skills.length > 0 && (
        <div className="mt-4">
          <strong>Skills:</strong>
          <ul className="list-disc ml-6 mt-1">
            {userData.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;