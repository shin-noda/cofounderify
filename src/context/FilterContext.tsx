// src/context/FilterContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from "react";

export interface FilterRange {
  start: Date;
  end: Date;
}

export type RangeKeyword = "today" | "tomorrow" | "nextWeek" | "thisWeek" | "thisMonth" | null;

interface FilterContextType {
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

  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRange, setFilterRange] = useState<FilterRange | null>(null);
  const [rangeKeyword, setRangeKeyword] = useState<RangeKeyword>(null);

  const [roleFilter, setRoleFilter] = useState("All");
  const [memberCountFilter, setMemberCountFilter] = useState("All");

  const resetFilters = () => {
    setSearchQuery("");
    setFilterRange(null);
    setRangeKeyword(null);
    setRoleFilter("All");
    setMemberCountFilter("All");
  };

  return (
    <FilterContext.Provider
      value={{
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
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};