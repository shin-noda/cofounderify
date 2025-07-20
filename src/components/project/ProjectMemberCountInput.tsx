// src/components/create-project/MemberCountInput.tsx
import React, { useState } from "react";

interface MemberCountInputProps {
  value: number;
  onChange: (value: number) => void;
}

const MemberCountInput: React.FC<MemberCountInputProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);

    if (val < 1) {
      setError("Minimum 1 member required.");
      onChange(1);
    } else if (val > 10) {
      setError("Maximum 10 members allowed.");
      onChange(10);
    } else {
      setError("");
      onChange(val);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Number of Members (including you)
      </label>
      <input
        type="number"
        min={1}
        max={10}
        value={value}
        onChange={handleChange}
        className={`w-full border rounded p-2 mt-1 ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default MemberCountInput;