// src/components/RegisterFirstNameField.tsx
import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegisterFirstNameField: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      value={value}
      onChange={onChange}
      required
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  );
};

export default RegisterFirstNameField;