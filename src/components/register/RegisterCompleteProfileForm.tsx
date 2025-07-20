// src/components/register/RegisterCompleteProfileForm.tsx
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  RegisterFirstNameField,
  RegisterLastNameField,
  RegisterDisplayName,
  RegisterCountrySelect,
  RegisterCity,
  RegisterLinkedIn,
  RegisterSkills,
  RegisterPhotoUpload,
  RegisterSubmitButton,
  RegisterErrorMessage,
} from ".";
import { useNavigate } from "react-router-dom";
import { validateRequiredFields } from "../../utils/RegisterValidation";
import { getCountryCode } from "../../utils/countryCodes";

const auth = getAuth();
const db = getFirestore();

const RegisterCompleteProfileForm: React.FC = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    country: "",
    city: "",
    linkedIn: "",
    skills: [] as string[],
    photoFile: null as File | null,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Updated handleChange to accept null (for react-select clearing)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | null
  ) => {
    if (!e) {
      // If e is null (e.g., cleared selection), clear the field accordingly
      setFormData((prev) => ({
        ...prev,
        country: "", // or other fields depending on context
      }));
      return;
    }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("User not authenticated.");
      return;
    }

    // Validate trimmed fields
    const errorMessage = validateRequiredFields({
      firstName: formData.firstName,
      lastName: formData.lastName,
      displayName: formData.displayName,
    });

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const photoURL = ""; // Placeholder for photo upload logic

      await setDoc(
        doc(db, "users", user.uid),
        {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          displayName: formData.displayName.trim(),
          email: user.email,
          country: formData.country,
          city: formData.city,
          linkedIn: formData.linkedIn,
          skills: formData.skills,
          photoURL,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // Navigate and refresh to re-trigger app state logic
      navigate("/dashboard");
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to complete profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto mt-12 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Complete Your Profile
      </h2>

      <RegisterFirstNameField value={formData.firstName} onChange={handleChange} />
      <RegisterLastNameField value={formData.lastName} onChange={handleChange} />
      <RegisterDisplayName value={formData.displayName} onChange={handleChange} />

      <RegisterCountrySelect
        value={formData.country}
        onChange={(e) => {
          if (!e) {
            setFormData(prev => ({ ...prev, country: "", city: "" }));
          } else {
            setFormData(prev => ({
              ...prev,
              country: e.target.value,
              city: "",
            }));
          }
        }}
      />

      <RegisterCity
        value={formData.city}
        onChange={(val) => setFormData(prev => ({ ...prev, city: val }))}
        countryCode={getCountryCode(formData.country)} // helper function to map country name to code
      />

      <RegisterLinkedIn value={formData.linkedIn} onChange={handleChange} />
      <RegisterSkills selectedSkills={formData.skills} onChange={handleChange} />
      <RegisterPhotoUpload onChange={handleChange} />

      <RegisterErrorMessage message={error} />
      <RegisterSubmitButton loading={loading} />
    </form>
  );
};

export default RegisterCompleteProfileForm;