// src/components/RegisterCity.tsx
import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegisterCity: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="city"
      placeholder="City"
      required
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  );
};

export default RegisterCity;