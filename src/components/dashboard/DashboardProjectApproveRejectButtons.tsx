// src/components/dashboard/ProjectApproveRejectButtons.tsx
import React from "react";

interface Props {
  requestId: string;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

const DashboardProjectApproveRejectButtons: React.FC<Props> = ({
  requestId,
  onApprove,
  onReject,
}) => {
  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => onApprove(requestId)}
        className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Approve
      </button>
      <button
        onClick={() => onReject(requestId)}
        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Reject
      </button>
    </div>
  );
};

export default DashboardProjectApproveRejectButtons;