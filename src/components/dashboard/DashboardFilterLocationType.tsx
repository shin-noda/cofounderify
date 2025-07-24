// src/components/dashboard/DashboardFilterLocationType.tsx
import React, { useState, useRef, useEffect } from "react";
import DashboardFilterButton from "./DashboardFilterButton";

interface DashboardFilterLocationTypeProps {
  value: "in-person" | "virtual" | "hybrid" | "";
  onChange: (value: "in-person" | "virtual" | "hybrid" | "") => void;
}

const locationTypeOptions: Array<DashboardFilterLocationTypeProps["value"]> = [
  "",
  "in-person",
  "hybrid",
  "virtual",
];

const locationTypeLabels: Record<DashboardFilterLocationTypeProps["value"], string> = {
  "": "Any Participation",
  "in-person": "In-Person",
  hybrid: "Hybrid",
  virtual: "Virtual",
};

const DashboardFilterLocationType: React.FC<DashboardFilterLocationTypeProps> = ({
  value,
  onChange,
}) => {
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

  const displayLabel = locationTypeLabels[value];

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <DashboardFilterButton
        label={displayLabel}
        isActive={open}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute mt-1 w-44 rounded-md bg-white border border-gray-300 shadow-lg z-10">
          {locationTypeOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm ${
                option === value ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`}
              type="button"
            >
              {locationTypeLabels[option]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardFilterLocationType;