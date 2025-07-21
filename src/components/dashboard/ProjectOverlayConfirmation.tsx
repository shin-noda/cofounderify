// src/components/ProjectOverlayConfirmation.tsx
import React from "react";

interface ProjectOverlayConfirmationProps {
  selectedRole: string | null;
  requestMessage: string;
  onRequestMessageChange: (msg: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  disabled: boolean;
}

const ProjectOverlayConfirmation: React.FC<ProjectOverlayConfirmationProps> = ({
  selectedRole,
  requestMessage,
  onRequestMessageChange,
  onCancel,
  onConfirm,
  disabled,
}) => {
  if (!selectedRole) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2">
          Request to join as {selectedRole}
        </h3>
        <textarea
          value={requestMessage}
          onChange={(e) => onRequestMessageChange(e.target.value)}
          placeholder="Hi, I'm excited to join your project!"
          className="w-full border border-gray-300 rounded p-2 h-24 mb-4"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={disabled}
            className={`px-4 py-2 rounded text-white ${
              disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverlayConfirmation;