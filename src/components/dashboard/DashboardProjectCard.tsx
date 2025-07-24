import React from "react";
import { ProjectImage, ProjectInfo } from "../project";
import type { ProjectCardProps } from "../../types/ProjectCard";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

function toDate(date?: string | Timestamp | null): Date | null {
  if (!date) return null;
  if (date instanceof Timestamp) return date.toDate();
  return new Date(date);
}

function toISOStringSafe(date?: string | Timestamp | null): string {
  const d = toDate(date);
  if (!d || isNaN(d.getTime())) return "";
  return d.toISOString();
}

// Helper to truncate description to 25 characters max
function truncateDescription(desc?: string, maxChars = 35): string {
  if (!desc) return "";
  if (desc.length <= maxChars) return desc;
  return desc.slice(0, maxChars) + "...";
}


const DashboardProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  memberCount,
  roles,
  startDateTime,
  endDateTime,
  onClick,
}) => {
  const start = toDate(startDateTime);
  const end = toDate(endDateTime);

  const startDateStr = start ? format(start, "MMM d, yyyy") : "";
  const endDateStr = end ? format(end, "MMM d, yyyy") : "";

  const shortDescription = truncateDescription(description);

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
        description={shortDescription}
        memberCount={memberCount}
        roles={roles}
        startDateTime={toISOStringSafe(startDateTime)}
        endDateTime={toISOStringSafe(endDateTime)}
      />

      <div className="px-4 pb-4 text-sm text-gray-600 space-y-1">
        {startDateStr && (
          <div>
            <strong>Start:</strong> {startDateStr}
          </div>
        )}
        {endDateStr && (
          <div>
            <strong>End:</strong> {endDateStr}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardProjectCard;