// src/components/create-project/ProjectTitleInput.tsx
import React from "react";

interface ProjectTitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ProjectTitleInput: React.FC<ProjectTitleInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Project Title</label>
      <input
        type="text"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded p-2 mt-1"
        placeholder="e.g. Remote Devs Connect"
      />
    </div>
  );
};

export default ProjectTitleInput;