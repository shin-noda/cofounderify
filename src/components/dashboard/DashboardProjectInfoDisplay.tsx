// src/components/ProjectInfoDisplay.tsx
import React from "react";
import type { Project } from "../../types/Project";
import { Timestamp } from "firebase/firestore";

interface Props {
  project: Project;
  formatDateTime: (value?: Date | string | null) => string;
}

const DashboardProjectInfoDisplay: React.FC<Props> = ({ project, formatDateTime }) => {
  // Helper to convert Timestamp to Date or pass through
  const normalizeDateTime = (value?: string | Date | Timestamp | null) => {
    if (!value) return null;
    if (value instanceof Timestamp) {
      return value.toDate();
    }
    return value;
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>

      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full object-cover rounded mb-4"
        />
      )}

      <p>
        <strong>Members:</strong> {project.memberCount}
      </p>

      <p>
        <strong>Roles:</strong> {project.roles.join(", ")}
      </p>

      {project.location && (
        <p>
          <strong>Location:</strong>{" "}
          {project.location.address ??
            `${project.location.lat.toFixed(4)}, ${project.location.lng.toFixed(4)}`}
        </p>
      )}

      <p>
        <strong>Start Time:</strong> {formatDateTime(normalizeDateTime(project.startDateTime))}
      </p>

      <p>
        <strong>End Time:</strong> {formatDateTime(normalizeDateTime(project.endDateTime))}
      </p>

      <p className="mb-4">{project.description}</p>
    </>
  );
};

export default DashboardProjectInfoDisplay;