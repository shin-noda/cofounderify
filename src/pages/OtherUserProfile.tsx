import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  User,
  Tags,
  MapPin,
  LucideUserCircle2,
} from "lucide-react";

interface UserProfileData {
  displayName?: string;
  skills?: string[];
  city?: string;
  country?: string;
  aboutMe?: string;
  photoURL?: string;
  fullName?: string; // Stored but NOT shown here
  email?: string;    // Stored but NOT shown here
}

const OtherUserProfile: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const isOwner = currentUser?.uid === uid;

  useEffect(() => {
    if (!uid) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const db = getFirestore();
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data() as UserProfileData);
        } else {
          setError("User not found");
          setUserData(null);
        }
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
    );
  };

  const handlePhotoUploadClick = () => {
    if (!isOwner) return;
    alert("Photo upload not implemented in this snippet");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!userData) return null;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-8 text-center">
        {/* HEADER ICON */}
        <div className="flex items-center justify-center gap-2 mb-6">
        <LucideUserCircle2 className="w-6 h-6 text-gray-700" />
        <h1 className="text-lg font-semibold text-gray-700">Profile</h1>
        </div>

        {/* Profile Photo */}
        <button
        onClick={isOwner ? handlePhotoUploadClick : undefined}
        disabled={!isOwner}
        aria-label={isOwner ? "Change profile photo" : "User profile photo"}
        aria-disabled={!isOwner}
        tabIndex={isOwner ? 0 : -1}
        className={`w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 flex items-center justify-center bg-gray-300 ${
            isOwner
            ? "cursor-pointer hover:opacity-80"
            : "cursor-default pointer-events-none"
        }`}
        type="button"
        >
        {userData.photoURL ? (
            <img
            src={userData.photoURL}
            alt={`${userData.displayName ?? "User"}'s avatar`}
            className="w-full h-full object-cover"
            draggable={false}
            />
        ) : (
            <span className="text-4xl font-semibold text-white">
            {getInitials(userData.displayName)}
            </span>
        )}
        </button>

        {/* Nickname */}
        <div className="flex items-center justify-center gap-2 mb-4">
        <User className="w-5 h-5 text-gray-600" />
        <span className="text-lg font-medium">
            {userData.displayName ?? "No nickname"}
        </span>
        </div>

        {/* Skills */}
        {userData.skills && userData.skills.length > 0 && (
        <div className="mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
            <Tags className="w-5 h-5 text-gray-600" />
            <span className="font-semibold">Skills</span>
            </div>
            <ul className="list-disc list-inside inline-block text-left">
            {userData.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
            ))}
            </ul>
        </div>
        )}

        {/* Place */}
        {(userData.city || userData.country) && (
        <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-600" />
            <span>
            {[userData.city, userData.country].filter(Boolean).join(", ")}
            </span>
        </div>
        )}

        {/* About Me */}
        {userData.aboutMe && (
        <div className="text-center">
            <h3 className="font-semibold mb-1">About Me</h3>
            <p className="whitespace-pre-wrap">{userData.aboutMe}</p>
        </div>
        )}
    </div>
    );
};

export default OtherUserProfile;