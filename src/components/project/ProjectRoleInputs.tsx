// src/components/RoleInputs.tsx
import React from "react";
import type { RoleInputsProps } from "../../types/RoleInputs";

const ProjectRoleInputs: React.FC<RoleInputsProps> = ({ roles, onRoleChange }) => (
  <>
    <label className="block text-sm font-medium text-gray-700">Roles</label>
    {roles.map((role, idx) => (
      <input
        key={idx}
        type="text"
        required
        placeholder={`Role #${idx + 1} (e.g., backend, frontend, biz)`}
        value={role}
        onChange={(e) => onRoleChange(idx, e.target.value)}
        className="w-full border rounded p-2 mt-1 mb-2"
      />
    ))}
  </>
);

export default ProjectRoleInputs;