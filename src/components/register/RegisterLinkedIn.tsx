// src/components/RegisterLinkedIn.tsx
import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegisterLinkedIn: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="url"
      name="linkedIn"
      placeholder="LinkedIn URL (optional)"
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  );
};

export default RegisterLinkedIn;