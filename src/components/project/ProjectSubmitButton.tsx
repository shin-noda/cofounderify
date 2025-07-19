import React from "react";

interface ProjectSubmitButtonProps {
  loading: boolean;
}

const ProjectSubmitButton: React.FC<ProjectSubmitButtonProps> = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Creating..." : "Create Project"}
    </button>
  );
};

export default ProjectSubmitButton;