// src/components/project/ProjectRolesButtons.tsx
import React from "react";

interface Member {
  uid: string;
  role: string;
}

interface Request {
  uid: string;
  role: string;
}

interface Project {
  members?: Member[];
  requests?: Request[];
}

interface Props {
  roles: string[];           // all roles, creator role at index 0
  yourRole: string | null;   // your current role if joined or requested
  userStatus: "approved" | "pending" | "none";  // your membership/request status
  isOwner: boolean;
  takenRoles: string[];      // roles taken by others (requests)
  onRequestClick: (role: string) => void;
  project: Project;
}

const DashboardProjectRolesButtons: React.FC<Props> = ({
  roles,
  yourRole,
  userStatus,
  isOwner,
  takenRoles,
  onRequestClick,
  project,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {roles.map((role, i) => {
        const isCreatorRole = i === 0;
        const isYourRole = yourRole === role;

        const renderRoleLabel = () => {
          if (isYourRole) {
            if (userStatus === "pending") {
              return (
                <>
                  <span className="font-semibold text-yellow-600">Request pending: </span>
                  {role}
                </>
              );
            }
            if (userStatus === "approved") {
              return (
                <>
                  <span className="font-semibold text-indigo-600">(You) </span>
                  {role}
                </>
              );
            }
          }
          return role;
        };

        // 1. Owner view
        if (isOwner) {
          const isYourRole = i === 0;

          const isApproved = project.members?.some((m) => m.role === role) ?? false;
          const isPending = project.requests?.some((r) => r.role === role) ?? false;

          const bgColor = isYourRole
            ? "bg-blue-400 text-white"
            : isApproved
            ? "bg-green-100 text-green-900"
            : isPending
            ? "bg-yellow-100 text-yellow-900"
            : "bg-gray-200 text-gray-700";

          const label = isYourRole
            ? `(You) ${role}`
            : isApproved
            ? `${role} (filled)`
            : isPending
            ? `${role} (pending)`
            : `${role} (not filled)`;

          return (
            <button
              key={role}
              disabled
              className={`w-full ${bgColor} px-3 py-2 rounded cursor-not-allowed text-center`}
            >
              {label}
            </button>
          );
        }

        // 2. Non-owner, not joined
        if (!isOwner && userStatus === "none") {
          if (isCreatorRole) {
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

          if (takenRoles.includes(role)) {
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

          return (
            <button
              key={role}
              onClick={() => onRequestClick(role)}
              className="w-full bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-700 text-center"
            >
              Request to join {role}
            </button>
          );
        }

        // 3. Non-owner, has joined or pending
        if (!isOwner && userStatus !== "none") {
          return (
            <button
              key={role}
              disabled
              className={`w-full px-3 py-2 rounded cursor-not-allowed text-center ${
                isYourRole
                  ? userStatus === "approved"
                    ? "bg-blue-400 text-white"
                    : "bg-yellow-100 text-yellow-900"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {renderRoleLabel()}
            </button>
          );
        }

        return null;
      })}
    </div>
  );
};

export default DashboardProjectRolesButtons;
