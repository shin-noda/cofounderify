// src/components/dashboard/ProjectHeaderLocationFilter.tsx
import React, { useEffect, useState } from "react";
import Select from "react-select";

interface Project {
  location?: {
    address?: string;
  };
}

interface Props {
  projects: Project[];
  locationFilter: string;
  setLocationFilter: React.Dispatch<React.SetStateAction<string>>;
}

const DashboardProjectHeaderLocationFilter: React.FC<Props> = ({
  projects,
  locationFilter,
  setLocationFilter,
}) => {
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);

  // Extract unique locations from projects whenever projects change
  useEffect(() => {
    const uniqueLocationsSet = new Set<string>();

    projects.forEach((proj) => {
      const addr = proj.location?.address;
      if (addr) {
        uniqueLocationsSet.add(addr);
      }
    });

    const uniqueLocations = Array.from(uniqueLocationsSet).sort((a, b) => a.localeCompare(b));
    setAvailableLocations(uniqueLocations);
  }, [projects]);

  // Prepare options for react-select
  const options = availableLocations.map((loc) => ({ value: loc, label: loc }));

  // Find the selected option object for react-select
  const selectedOption = options.find((opt) => opt.value === locationFilter) || null;

  return (
    <div className="w-60">
      <Select
        options={options}
        value={selectedOption}
        onChange={(selected) => setLocationFilter(selected ? selected.value : "")}
        isClearable
        placeholder="Select location..."
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default DashboardProjectHeaderLocationFilter;
