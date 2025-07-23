import React from "react";
import { Label } from "../../ui/Label";

interface FilterDropdownProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

const DashboardFilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <Label>{label}</Label>
      <select
        className="w-36 p-2 border border-gray-300 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DashboardFilterDropdown;