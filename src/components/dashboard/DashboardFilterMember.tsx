// src/components/dashboard/FilterMember.tsx
import React, { useState, useRef, useEffect } from "react";
import DashboardFilterButton from "./DashboardFilterButton";

interface FilterMemberProps {
  value: string;
  onChange: (value: string) => void;
}

const memberOptions = ["All", "1-2", "3-5", "6+"];

const DashboardFilterMember: React.FC<FilterMemberProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Display label: "Any Members" instead of "All"
  const displayLabel = value === "All" ? "Any Members" : value;

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <DashboardFilterButton
        label={displayLabel}
        isActive={open}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute mt-1 w-40 rounded-md bg-white border border-gray-300 shadow-lg z-10">
          {memberOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm ${
                option === value ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {option === "All" ? "Any Members" : option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardFilterMember;