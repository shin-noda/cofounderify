import React from "react";

interface ProjectSubmitButtonProps {
  loading: boolean;
  submitButtonLabel?: string; // Optional custom label
}

const ProjectSubmitButton: React.FC<ProjectSubmitButtonProps> = ({
  loading,
  submitButtonLabel = "Create Project", // fallback to default
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`bg-black text-white w-full px-4 py-2 rounded hover:bg-gray-800 transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? `${submitButtonLabel.split(" ")[0]}ing...` : submitButtonLabel}
    </button>
  );
};

export default ProjectSubmitButton;