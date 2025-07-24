// src/components/create-project/ProjectLocationType.tsx
import React from "react";

interface ProjectLocationTypeProps {
  value: string;
  onChange: (value: "in-person" | "virtual" | "hybrid") => void;
}

const ProjectLocationType: React.FC<ProjectLocationTypeProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Participation Type</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as "in-person" | "virtual" | "hybrid")}
        className="w-full border rounded p-2"
      >
        <option value="in-person">In-Person</option>
        <option value="hybrid">Hybrid</option>
        <option value="virtual">Virtual</option>
      </select>
    </div>
  );
};

export default ProjectLocationType;