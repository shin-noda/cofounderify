import React, { useState, useMemo, useEffect } from "react";
import { getTimeZones } from "@vvo/tzdb";

interface ProjectVirtualTimeZonePickerProps {
  value: string; // timezone string like "America/Toronto"
  onChange: (tz: string) => void;
}

const ProjectVirtualTimeZonePicker: React.FC<ProjectVirtualTimeZonePickerProps> = ({ value, onChange }) => {
  const [search, setSearch] = useState("");

  // List of timezones with info: name, country, offset
  const timeZones = useMemo(() => {
    return getTimeZones().map((tz) => {
      // Compose a nice display string
      const city = tz.name.split("/")[1]?.replace(/_/g, " ") || tz.name;
      const offsetHours = Math.floor(tz.currentTimeOffsetInMinutes / 60);
      const offsetMinutes = Math.abs(tz.currentTimeOffsetInMinutes % 60);
      const offsetSign = tz.currentTimeOffsetInMinutes >= 0 ? "+" : "-";
      const offsetStr = `UTC${offsetSign}${String(Math.abs(offsetHours)).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;

      return {
        name: tz.name,
        display: `${city}, ${tz.countryName} (${offsetStr})`,
      };
    });
  }, []);

  // Filter by search text (case-insensitive)
  const filteredZones = timeZones.filter((tz) =>
    tz.display.toLowerCase().includes(search.toLowerCase())
  );

  // When value changes from outside, reset search so user sees fresh list next time
  useEffect(() => {
    if (!value) setSearch("");
  }, [value]);

  // When selected, show chip + clear button, else show input + list
  if (value) {
    const selected = timeZones.find((tz) => tz.name === value);
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Virtual Timezone</label>
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded px-3 py-1">
          <span>{selected ? selected.display : value}</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="font-bold hover:text-blue-600 focus:outline-none"
            aria-label="Clear selected timezone"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor="virtual-timezone" className="block text-sm font-medium text-gray-700 mb-1">
        Virtual Timezone
      </label>
      <input
        type="text"
        id="virtual-timezone"
        className="w-full border rounded p-2 mb-2"
        placeholder="Search city or country (e.g. Toronto)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
      />
      <select
        size={5}
        className="w-full border rounded p-2 cursor-pointer"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {filteredZones.length === 0 && <option disabled>No matching timezones</option>}
        {filteredZones.map((tz) => (
          <option key={tz.name} value={tz.name}>
            {tz.display}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectVirtualTimeZonePicker;