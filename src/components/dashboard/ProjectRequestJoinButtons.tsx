// src/components/ProjectRequestJoinButtons.tsx
import React from "react";

interface Props {
  roles: string[];
  onRequestClick: (role: string) => void;
  disabled: boolean;
}

const ProjectRequestJoinButtons: React.FC<Props> = ({
  roles,
  onRequestClick,
  disabled,
}) => {
  return (
    <div className="mt-6">
      <p className="font-semibold mb-2">Want to join this project?</p>
      <div className="flex flex-col gap-4">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => onRequestClick(role)}
            disabled={disabled}
            className={`w-full px-4 py-3 rounded-lg font-semibold shadow transition ${
              disabled
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Request to join as {role}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectRequestJoinButtons;