// src/components/ProjectBackButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardProjectBackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-4 text-blue-600 hover:underline"
    >
      &larr; Back
    </button>
  );
};

export default DashboardProjectBackButton;