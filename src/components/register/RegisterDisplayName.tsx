// src/components/RegisterDisplayName.tsx
import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegisterDisplayName: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="displayName"
      placeholder="Display Name (optional)"
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  );
};

export default RegisterDisplayName;