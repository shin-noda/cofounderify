// src/components/project/ProjectRolesButtons.tsx
import React from "react";

interface Props {
  roles: string[];           // all roles, creator role at index 0
  yourRole: string | null;   // your current role if joined
  isOwner: boolean;
  takenRoles: string[];      // roles taken by others
  onRequestClick: (role: string) => void;
}

const ProjectRolesButtons: React.FC<Props> = ({
  roles,
  yourRole,
  isOwner,
  takenRoles,
  onRequestClick,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {roles.map((role, i) => {
        const isCreatorRole = i === 0;
        const isYourRole = yourRole === role;
        const isTaken = takenRoles.includes(role);

        // This is for testing
        // console.log("Role:", role, "yourRole:", yourRole, "isYourRole:", yourRole === role);


        // Helper to render role label with optional (You) prefix styled
        const renderRoleLabel = () =>
          isYourRole ? (
            <>
              <span className="font-semibold text-gray-700">(You) </span>
              {role}
            </>
          ) : (
            role
          );

        // 1. Creator sees all buttons disabled, own role labeled "(You) Role"
        if (isOwner) {
          return (
            <button
              key={role}
              disabled
              className="w-full bg-gray-300 text-gray-700 px-3 py-2 rounded cursor-not-allowed text-center"
            >
              {renderRoleLabel()}
            </button>
          );
        }

        // 2. Non-owner & NOT joined yet
        if (!isOwner && !yourRole) {
          if (isCreatorRole) {
            // Creator's role always disabled
            return (
              <button
                key={role}
                disabled
                className="w-full bg-gray-200 text-gray-700 px-3 py-2 rounded cursor-not-allowed text-center"
              >
                {role}
              </button>
            );
          }

          // If role taken by others, disable button with role name
          if (isTaken) {
            return (
              <button
                key={role}
                disabled
                className="w-full bg-gray-200 text-gray-700 px-3 py-2 rounded cursor-not-allowed text-center"
              >
                {role}
              </button>
            );
          }

          // Otherwise role available, enabled button with "Request to join <role>"
          return (
            <button
              key={role}
              onClick={() => onRequestClick(role)}
              className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-center"
            >
              Request to join {role}
            </button>
          );
        }

        // 3. Non-owner & HAS joined
        if (!isOwner && yourRole) {
          return (
            <button
              key={role}
              disabled
              className={`w-full px-3 py-2 rounded cursor-not-allowed text-center ${
                isYourRole
                  ? "bg-blue-300 text-blue-900"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {renderRoleLabel()}
            </button>
          );
        }

        // fallback, should not happen
        return null;
      })}
    </div>
  );
};

export default ProjectRolesButtons;