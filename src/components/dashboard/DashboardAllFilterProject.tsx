// src/components/dashboard/AllFilterProject.tsx
import React from "react";
import DashboardSearchBar from "./DashboardSearchBar";
import DashboardFilterProject from "./DashboardFilterProjectDate";
import DashboardFilterRole from "./DashboardFilterRole";
import DashboardFilterMember from "./DashboardFilterMember";
import { type FilterRange, type RangeKeyword } from "../../context/FilterContext";
import DashboardFilterLocationType from "./DashboardFilterLocationType";

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filterRange: FilterRange | null;
  setFilterRange: React.Dispatch<React.SetStateAction<FilterRange | null>>;
  rangeKeyword: RangeKeyword;
  setRangeKeyword: React.Dispatch<React.SetStateAction<RangeKeyword>>;
  roleFilter: string;
  setRoleFilter: React.Dispatch<React.SetStateAction<string>>;
  memberCountFilter: string;
  setMemberCountFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredCount: number;
  locationTypeFilter: "in-person" | "virtual" | "hybrid" | "";
  setLocationTypeFilter: React.Dispatch<
    React.SetStateAction<"in-person" | "virtual" | "hybrid" | "">
  >;
}

const DashboardAllFilterProject: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  filterRange,
  setFilterRange,
  rangeKeyword,
  setRangeKeyword,
  roleFilter,
  setRoleFilter,
  memberCountFilter,
  setMemberCountFilter,
  locationTypeFilter,
  setLocationTypeFilter,
  filteredCount,
}) => {
  return (
    <div className="max-w-md w-full mx-auto mb-6">
      {/* 1st row: SearchBar */}
      <div className="mb-4">
        <DashboardSearchBar value={searchQuery} onSearch={setSearchQuery} placeholder="Search projects..." />
      </div>

      {/* 2nd row: filters */}
      <div className="flex gap-3 justify-center">
        <DashboardFilterProject
          filterRange={filterRange}
          setFilterRange={setFilterRange}
          rangeKeyword={rangeKeyword}
          setRangeKeyword={setRangeKeyword}
        />
        <DashboardFilterRole value={roleFilter} onChange={setRoleFilter} />
        <DashboardFilterMember value={memberCountFilter} onChange={setMemberCountFilter} />
        <DashboardFilterLocationType
          value={locationTypeFilter}
          onChange={setLocationTypeFilter}
        />
      </div>

      <div className="text-sm text-gray-600 font-medium mt-3 text-center">
        Results: {filteredCount} {filteredCount === 1 ? "project" : "projects"}
      </div>
    </div>
  );
};

export default DashboardAllFilterProject;