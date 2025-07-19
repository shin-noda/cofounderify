// src/components/RegisterForm.tsx
import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, type User } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import type { FormData } from "../../types/Form";
import {
  RegisterFirstNameField,
  RegisterLastNameField,
  RegisterDisplayName,
  RegisterCountrySelect,
  RegisterCity,
  RegisterLinkedIn,
  RegisterSkills,
  RegisterPhotoUpload,
  RegisterErrorMessage,
  RegisterSubmitButton,
  RegisterLinkToSignIn,
} from ".";

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    country: "",
    city: "",
    linkedIn: "",
    skills: [],
    photoFile: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "skills" && type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => {
        const newSkills = checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value);
        return { ...prev, skills: newSkills };
      });
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({ ...prev, photoFile: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user: User = result.user;

      const firstName = formData.firstName || user.displayName?.split(" ")[0] || "";
      const lastName = formData.lastName || user.displayName?.split(" ")[1] || "";
      const displayName = formData.displayName || user.displayName || "";

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        displayName,
        email: user.email,
        country: formData.country,
        city: formData.city,
        linkedIn: formData.linkedIn || "",
        skills: formData.skills,
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
      });

      alert("Registration successful!");
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <RegisterFirstNameField
        value={formData.firstName}
        onChange={handleChange}
      />

      <RegisterLastNameField
        value={formData.lastName}
        onChange={handleChange}
      />

      <RegisterDisplayName
        value={formData.displayName}
        onChange={handleChange}
      />

      <RegisterCountrySelect
        value={formData.country}
        onChange={handleChange}
      />

      <RegisterCity
        value={formData.city}
        onChange={handleChange} 
      />

      <RegisterLinkedIn
        value={formData.linkedIn}
        onChange={handleChange} 
      />

      <RegisterSkills
        selectedSkills={formData.skills}
        onChange={handleChange}
      />
      
      <RegisterPhotoUpload 
        onChange={handleChange} 
      />

      {/* inside your form JSX */}
      <RegisterErrorMessage message={error} />

      <RegisterSubmitButton
        loading={loading}
        onClick={handleGoogleSignIn} 
      />

      <RegisterLinkToSignIn />
    </div>
  );
};

export default RegisterForm;