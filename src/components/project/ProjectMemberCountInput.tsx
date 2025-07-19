// src/components/create-project/MemberCountInput.tsx
import React from "react";

interface MemberCountInputProps {
  value: number;
  onChange: (value: number) => void;
}

const MemberCountInput: React.FC<MemberCountInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Number of Members (including Big Brainer)
      </label>
      <input
        type="number"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border rounded p-2 mt-1"
      />
    </div>
  );
};

export default MemberCountInput;