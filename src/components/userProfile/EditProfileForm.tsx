import React, { useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../lib/firebase";
import type { UserData } from "../../types/UserData";

interface EditProfileFormProps {
  userData: UserData;
  onSaveSuccess?: () => void;
  onCancel?: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  userData,
  onSaveSuccess,
  onCancel,
}) => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const currentUser = auth.currentUser;

  const [displayName, setDisplayName] = useState(userData.displayName || "");
  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [city, setCity] = useState(userData.city || "");
  const [country, setCountry] = useState(userData.country || "");
  const [linkedIn, setLinkedIn] = useState(userData.linkedIn || "");
  const [skills, setSkills] = useState(userData.skills ? userData.skills.join(", ") : "");
  const [aboutMe, setAboutMe] = useState(userData.aboutMe || "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!currentUser) return <p>You must be logged in to edit your profile.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        displayName: displayName.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        city: city.trim(),
        country: country.trim(),
        linkedIn: linkedIn.trim(),
        aboutMe: aboutMe.trim(),
        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0),
      });
      setSuccessMsg("Profile updated successfully!");
      if (onSaveSuccess) onSaveSuccess();
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

      <label className="block mb-2">
        Display Name
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
          required
        />
      </label>

      <label className="block mb-2">
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>

      <label className="block mb-2">
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>

      <label className="block mb-2">
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>

      <label className="block mb-2">
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>

      <label className="block mb-2">
        LinkedIn URL
        <input
          type="url"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>

      <label className="block mb-2">
        Skills (comma separated)
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g. JavaScript, React, Design"
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>

      <label className="block mb-4">
        About Me
        <textarea
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          rows={4}
          className="w-full border rounded px-3 py-2 mt-1 resize-none"
          placeholder="Tell us about yourself"
        />
      </label>

      <button
        type="submit"
        disabled={saving}
        className={`w-full bg-blue-600 text-white py-2 rounded ${
          saving ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="w-full mt-3 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
      >
        Cancel Edit
      </button>
    </form>
  );
};

export default EditProfileForm;