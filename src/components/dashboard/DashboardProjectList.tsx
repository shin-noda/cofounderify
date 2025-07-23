// src/components/dashboard/ProjectList.tsx
import React from "react";
import DashboardProjectCard from "./DashboardProjectCard";
import type { ProjectCardProps } from "../../types/ProjectCard";
import { useNavigate } from "react-router-dom";

interface ProjectListProps {
  projects: ProjectCardProps[]; // or any if you want
}

const DashboardProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return <p className="text-center w-full">No projects found. Create one!</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {projects.map((proj) => (
        <DashboardProjectCard
          key={proj.id}
          {...proj}
          onClick={() => navigate(`/project/${proj.id}`)}
        />
      ))}
    </div>
  );
};

export default DashboardProjectList;