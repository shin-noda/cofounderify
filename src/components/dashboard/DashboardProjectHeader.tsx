import React from "react";
import Select from "react-select";

interface Props {
  locationFilter: string;
  setLocationFilter: React.Dispatch<React.SetStateAction<string>>;
  availableLocations: string[];
}

const DashboardProjectHeader: React.FC<Props> = ({
  locationFilter,
  setLocationFilter,
  availableLocations,
}) => {
  // Transform locations to react-select options
  const options = availableLocations.map((loc) => ({
    value: loc,
    label: loc,
  }));

  // Find the selected option object
  const selectedOption = options.find((opt) => opt.value === locationFilter) || null;

  return (
    <div className="max-w-6xl mx-auto px-4 mb-4 flex items-center gap-3 justify-center">
      <h1 className="text-3xl font-bold whitespace-nowrap">
        Projects:
      </h1>

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
    </div>
  );
};

export default DashboardProjectHeader;