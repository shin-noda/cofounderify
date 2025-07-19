// src/components/ProjectCard.tsx
import React from "react";
import { ProjectImage, ProjectInfo } from "../components";
import type { ProjectCardProps } from "../types/ProjectCard";

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  memberCount,
  roles,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`w-80 bg-white rounded-lg shadow-md m-4 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition ${
        onClick ? "focus:outline-none focus:ring-2 focus:ring-blue-500" : ""
      }`}
      onKeyPress={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          onClick();
        }
      }}
    >
      <ProjectImage imageUrl={imageUrl} title={title} />
      <ProjectInfo
        title={title}
        description={description}
        memberCount={memberCount}
        roles={roles}
      />
    </div>
  );
};

export default ProjectCard;