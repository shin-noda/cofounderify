import React from "react";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const DashboardFilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${
        isActive ? "font-semibold bg-gray-200" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default DashboardFilterButton;