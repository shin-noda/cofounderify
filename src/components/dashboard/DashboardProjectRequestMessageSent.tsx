// src/components/ProjectRequestMessageSent.tsx
import React from "react";

interface Props {
  role: string | null;
}

const DashboardProjectRequestMessageSent: React.FC<Props> = ({ role }) => {
  return (
    <div className="mt-6 text-center text-blue-600 text-lg font-semibold">
      📨 Request sent for the role of{" "}
      <span className="underline">{role}</span>!
    </div>
  );
};

export default DashboardProjectRequestMessageSent;