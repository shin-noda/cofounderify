// src/components/dashboard/FilterRole.tsx
import React, { useState, useRef, useEffect } from "react";
import DashboardFilterButton from "./DashboardFilterButton";

interface FilterRoleProps {
  value: string;
  onChange: (value: string) => void;
}

const roleOptions = ["All", "Frontend", "Backend", "Design", "Biz"];

const DashboardFilterRole: React.FC<FilterRoleProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show "Any Role" instead of "All"
  const displayLabel = value === "All" ? "Any Role" : value;

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <DashboardFilterButton
        label={displayLabel}
        isActive={open}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute mt-1 w-40 rounded-md bg-white border border-gray-300 shadow-lg z-10">
          {roleOptions.map((role) => (
            <button
              key={role}
              onClick={() => {
                onChange(role);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm ${
                role === value ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {role === "All" ? "Any Role" : role}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardFilterRole;