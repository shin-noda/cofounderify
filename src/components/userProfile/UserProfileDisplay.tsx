import React from "react";
import type { UserData } from "../../types/UserData";
import { Mail, MapPin, Linkedin, User, UserCheck, Tag } from "lucide-react";
import UserProfileImage from "./UserProfileImage";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

interface UserProfileDisplayProps {
  userData: UserData;
  uid: string;
  isOwnProfile: boolean;
  isEditing: boolean;
  skills?: string[];
  onEditClick: () => void;
  EditProfileForm: React.FC<{
    userData: UserData;
    onSaveSuccess: () => Promise<void>;
    onCancel: () => void;
  }>;
  fetchUserData: () => Promise<void>;
  setIsEditing: (editing: boolean) => void;
}

const UserProfileDisplay: React.FC<UserProfileDisplayProps> = ({
  userData,
  uid,
  isOwnProfile,
  isEditing,
  skills,
  onEditClick,
  EditProfileForm,
  fetchUserData,
  setIsEditing,
}) => {
  return (
    <>
      <UserProfileImage
        photoURL={userData.photoURL}
        displayName={userData.displayName}
        onUpload={async (uploadedUrl) => {
          if (!uploadedUrl) return;

          const db = getFirestore();
          const userRef = doc(db, "users", uid);
          await updateDoc(userRef, {
            photoURL: uploadedUrl,
          });

          await fetchUserData();
        }}
      />

      <div className="flex justify-center w-full">
        <div className="max-w-sm text-sm text-gray-800">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 items-start text-left">
            <User className="w-5 h-5 text-gray-500 mt-1" />
            <span>{userData.displayName ?? "N/A"}</span>

            <UserCheck className="w-5 h-5 text-gray-500 mt-1" />
            <span>{`${userData.firstName ?? ""} ${userData.lastName ?? ""}`.trim() || "N/A"}</span>

            <Mail className="w-5 h-5 text-gray-500 mt-1" />
            <span>{userData.email ?? "N/A"}</span>

            <MapPin className="w-5 h-5 text-gray-500 mt-1" />
            <span>
              {userData.city ? `${userData.city}, ` : ""}
              {userData.country ?? "N/A"}
            </span>

            {userData.linkedIn && (
              <>
                <Linkedin className="w-5 h-5 text-blue-600 mt-1" />
                <a
                  href={userData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-all"
                >
                  LinkedIn Profile
                </a>
              </>
            )}

            {skills && skills.length > 0 && (
              <>
                <Tag className="w-5 h-5 text-gray-600 mt-1" />
                <ul className="list-disc ml-4 text-left">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {isOwnProfile && !isEditing && (
        <button
          onClick={onEditClick}
          className="mt-6 px-5 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
        >
          Edit Profile
        </button>
      )}

      {isOwnProfile && isEditing && (
        <EditProfileForm
          userData={userData}
          onSaveSuccess={async () => {
            setIsEditing(false);
            await fetchUserData();
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </>
  );
};

export default UserProfileDisplay;