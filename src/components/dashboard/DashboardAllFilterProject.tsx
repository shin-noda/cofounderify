// src/components/dashboard/AllFilterProject.tsx
import React from "react";
import SearchBar from "./DashboardSearchBar";
import DashboardFilterProject from "./DashboardFilterProjectDate";
import DashboardFilterRole from "./DashboardFilterRole";
import DashboardFilterMember from "./DashboardFilterMember";
import { type FilterRange, type RangeKeyword } from "../../context/FilterContext";

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
  filteredCount,
}) => {
  return (
    <div className="max-w-md w-full mx-auto mb-6">
      {/* 1st row: SearchBar */}
      <div className="mb-4">
        <SearchBar value={searchQuery} onSearch={setSearchQuery} placeholder="Search projects..." />
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
      </div>

      <div className="text-sm text-gray-600 font-medium mt-3 text-center">
        Results: {filteredCount} {filteredCount === 1 ? "project" : "projects"}
      </div>
    </div>
  );
};

export default DashboardAllFilterProject;