import React, { useState, useEffect, useRef } from "react";
import { type RangeKeyword } from "../../context/FilterContext";
import DashboardFilterButton from "./DashboardFilterButton";

interface Props {
  filterRange: { start: Date; end: Date } | null;
  setFilterRange: (range: { start: Date; end: Date } | null) => void;
  rangeKeyword: RangeKeyword;
  setRangeKeyword: (keyword: RangeKeyword) => void;
}

const PRESETS: { label: string; value: RangeKeyword | null }[] = [
  { label: "Any Date", value: null },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "Next Week", value: "nextWeek" },
];

const DashboardFilterProjectDate: React.FC<Props> = ({
  setFilterRange,
  rangeKeyword,
  setRangeKeyword,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Handle selecting a preset
  const handleSelectPreset = (value: RangeKeyword | null) => {
    setRangeKeyword(value);
    setDropdownOpen(false);
    setFilterRange(null);
  };

  // Label for the button to show current selection
  const currentLabel =
    PRESETS.find((p) => p.value === rangeKeyword)?.label || "Any Date";

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <DashboardFilterButton
        label={currentLabel}
        isActive={dropdownOpen}
        onClick={() => setDropdownOpen((open) => !open)}
      />

      {dropdownOpen && (
        <div className="absolute z-10 mt-1 w-48 bg-white border rounded shadow-lg">
          {PRESETS.map(({ label, value }) => (
            <button
              key={value ?? "any"}
              onClick={() => handleSelectPreset(value)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-200 ${
                rangeKeyword === value ? "font-semibold bg-gray-100" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardFilterProjectDate;