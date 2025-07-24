// src/components/Project/DashboardEditProjectButton.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

interface Props {
  projectId: string;
}

const DashboardEditProjectButton: React.FC<Props> = ({ projectId }) => {
  const navigate = useNavigate();

  return (
    <button
      className="inline-flex text-blue-600 hover:underline items-center gap-1"
      onClick={() => navigate(`/edit/${projectId}`)}
    >
      <Pencil className="w-4 h-4" />
      Edit
    </button>
  );
};

export default DashboardEditProjectButton;