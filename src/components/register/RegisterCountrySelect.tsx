// src/components/RegisterCountrySelect.tsx
import React from "react";
import { countries } from "../../constants/countries";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const RegisterCountrySelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <select
      name="country"
      required
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2"
    >
      <option value="">Select Country</option>
      {countries.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default RegisterCountrySelect;