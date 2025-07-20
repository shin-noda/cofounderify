// src/components/register/RegisterEmailInput.tsx
import React from "react";

interface RegisterEmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RegisterEmailInput: React.FC<RegisterEmailInputProps> = ({ value, onChange, disabled = false }) => {
  return (
    <input
      type="email"
      placeholder="Email"
      required
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-3 py-2 border rounded"
    />
  );
};

export default RegisterEmailInput;