// src/components/signIn/SignInEmailInput.tsx
import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignInEmailInput: React.FC<Props> = ({ value, onChange }) => (
  <label className="block">
    <span className="text-gray-700">Email</span>
    <input
      type="email"
      required
      value={value}
      onChange={onChange}
      placeholder="you@example.com"
      className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </label>
);

export default SignInEmailInput;