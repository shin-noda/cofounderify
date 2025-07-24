import React from "react";

interface DashboardProjectEditCancelButtonProps {
  onCancel: () => void;
  className?: string; // optional to allow styling override
}

const DashboardProjectEditCancelButton: React.FC<DashboardProjectEditCancelButtonProps> = ({
  onCancel,
  className = "mt-2 w-full px-4 py-2 border rounded text-gray-700 hover:bg-gray-100",
}) => {
  return (
    <button type="button" onClick={onCancel} className={className}>
      Cancel
    </button>
  );
};

export default DashboardProjectEditCancelButton;