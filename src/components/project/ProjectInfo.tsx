// src/components/ProjectInfo.tsx
import React from "react";
import type { ProjectInfoProps } from "../../types/ProjectInfo";

const ProjectInfo: React.FC<ProjectInfoProps> = ({
  title,
  description,
  memberCount,
  roles,
}) => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-700 mb-3">{description}</p>
    <p className="text-sm text-gray-600 mb-1">
      Members: <span className="font-medium">{memberCount}</span>
    </p>
    <p className="text-sm text-gray-600">
      Roles:{" "}
      {roles.length > 0 ? (
        roles.join(", ")
      ) : (
        <span className="italic text-gray-400">No roles specified</span>
      )}
    </p>
  </div>
);

export default ProjectInfo;