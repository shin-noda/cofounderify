import React from "react";

export interface TextInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const SignInTextInput: React.FC<TextInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}) => (
  <label className="block">
    <span className="text-gray-700">{label}</span>
    <input
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </label>
);

export default SignInTextInput;