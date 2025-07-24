// src/components/register/RegisterUserAboutMe.tsx
import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RegisterUserAboutMe: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="aboutMe" className="block font-medium mb-1">
        About Me (optional)
      </label>
      <textarea
        id="aboutMe"
        name="aboutMe"
        rows={4}
        maxLength={500}
        className="w-full border rounded px-3 py-2"
        placeholder="Tell us a bit about yourself..."
        value={value}
        onChange={onChange}
      />
      <p className="text-sm text-gray-500 mt-1">
        Max 500 characters.
      </p>
    </div>
  );
};

export default RegisterUserAboutMe;