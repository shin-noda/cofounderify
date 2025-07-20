// src/components/register/RegisterPasswordInput.tsx
import React from "react";

interface RegisterPasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RegisterPasswordInput: React.FC<RegisterPasswordInputProps> = ({ value, onChange, disabled = false }) => {
  return (
    <input
      type="password"
      placeholder="Password"
      required
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-3 py-2 border rounded"
    />
  );
};

export default RegisterPasswordInput;