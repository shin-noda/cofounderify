import React from "react";

interface ProjectDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ProjectDescriptionInput: React.FC<ProjectDescriptionInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Project Description
      </label>
      <textarea
        required
        rows={4}
        maxLength={2000}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded p-2 mt-1"
        placeholder="Describe your project"
      />
      <p className="text-xs text-gray-500 mt-1">{value.length} / 2000 characters</p>
    </div>
  );
};

export default ProjectDescriptionInput;