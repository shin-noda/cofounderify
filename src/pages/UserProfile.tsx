import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import type { UserData } from "../types/UserData";
import EditProfileForm from "../components/userProfile/EditProfileForm";

// Import icons from lucide-react
import { Mail, MapPin, Linkedin, User, UserCheck, Tag } from "lucide-react";
import UserProfileDisplay from "../components/userProfile/UserProfileDisplay";

const UserProfile: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const isOwnProfile = currentUser?.uid === uid;

  const skills = userData?.skills;

  const fetchUserData = async () => {
    if (!uid) return;
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

  useEffect(() => {
    fetchUserData();
  }, [uid]);

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;

  if (!userData)
    return (
      <div className="p-6 text-center text-red-500">
        User not found or profile does not exist.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col items-center text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center w-full">
        {isOwnProfile ? "Your Profile" : "User Profile"}
      </h1>

      <UserProfileDisplay
        userData={userData}
        isOwnProfile={isOwnProfile}
        isEditing={isEditing}
        skills={skills}
        onEditClick={() => setIsEditing(true)}
        EditProfileForm={EditProfileForm}
        fetchUserData={fetchUserData}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default UserProfile;