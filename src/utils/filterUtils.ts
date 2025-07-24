// src/utils/filterUtils.ts
import { type FilterRange } from "../context/FilterContext";
import { addDays, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

export type RangeKeyword = "today" | "tomorrow" | "nextWeek" | "thisWeek" | "thisMonth" | null;

// Helper to get preset date ranges for keywords
export function getPresetRange(range: RangeKeyword): FilterRange | null {
  const now = new Date();
  switch (range) {
    case "today":
      return { start: startOfDay(now), end: endOfDay(now) };
    case "tomorrow": {
      const tomorrow = addDays(now, 1);
      return { start: startOfDay(tomorrow), end: endOfDay(tomorrow) };
    }
    case "nextWeek": {
      const start = startOfDay(addDays(now, 7 - now.getDay())); // Next Sunday
      const end = endOfDay(addDays(start, 6)); // Next Saturday
      return { start, end };
    }
    case "thisWeek": {
      const start = startOfWeek(now, { weekStartsOn: 0 });
      const end = endOfWeek(now, { weekStartsOn: 0 });
      return { start: startOfDay(start), end: endOfDay(end) };
    }
    case "thisMonth": {
      const start = startOfMonth(now);
      const end = endOfMonth(now);
      return { start: startOfDay(start), end: endOfDay(end) };
    }
    default:
      return null;
  }
}

// Parses URL params into initial filter values including range keyword and range dates
export function getInitialFilters(searchParams: URLSearchParams) {
  const rangeParam = searchParams.get("range") as RangeKeyword;

  let filterRange: FilterRange | null = null;

  if (rangeParam) {
    // Only handle presets, ignore custom range from URL (remove custom handling)
    filterRange = getPresetRange(rangeParam);
  }

  return {
    initialRole: searchParams.get("role") || "All",
    initialMembers: searchParams.get("members") || "All",
    initialSearch: searchParams.get("search") || "",
    initialFilterRange: filterRange,
    initialRangeKeyword: rangeParam || null,
  };
}

// Sync current filter state back to URL parameters
export function syncFiltersToURL({
  roleFilter,
  memberCountFilter,
  searchQuery,
  rangeKeyword,
  setSearchParams,
}: {
  roleFilter: string;
  memberCountFilter: string;
  searchQuery: string;
  filterRange: FilterRange | null;
  rangeKeyword: RangeKeyword | null;
  setSearchParams: (params: Record<string, string>) => void;
}) {
  const params: Record<string, string> = {};

  if (roleFilter !== "All") params.role = roleFilter;
  if (memberCountFilter !== "All") params.members = memberCountFilter;
  if (searchQuery.trim() !== "") params.search = searchQuery.trim();

  if (rangeKeyword) {
    params.range = rangeKeyword;
  }

  setSearchParams(params);
}

const validParticipationTypes = ["in-person", "virtual", "hybrid"] as const;
type ParticipationType = typeof validParticipationTypes[number];

export function applyAllFilters({
  projects,
  searchQuery,
  filterRange,
  roleFilter,
  memberCountFilter,
  locationFilter,
  locationTypeFilter = "", // default empty string
}: {
  projects: any[];
  searchQuery: string;
  filterRange: FilterRange | null;
  roleFilter: string;
  memberCountFilter: string;
  locationFilter: string;
  locationTypeFilter?: ParticipationType | "" | undefined;
}) {
  const now = new Date();

  return projects
    // Exclude past projects
    .filter((proj) => {
      const projectEnd = proj.endDateTime ? new Date(proj.endDateTime) : new Date(proj.startDateTime);
      return projectEnd >= now;
    })
    // Search by title or description
    .filter((proj) =>
      proj.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // Date range filter
    .filter((proj) => {
      if (!filterRange) return true;

      const projectStart = new Date(proj.startDateTime);
      const projectEnd = proj.endDateTime ? new Date(proj.endDateTime) : projectStart;
      const filterLengthInMs = filterRange.end.getTime() - filterRange.start.getTime();
      const oneDayMs = 24 * 60 * 60 * 1000;

      if (filterLengthInMs <= oneDayMs) {
        const filterStart = startOfDay(filterRange.start);
        const filterEnd = addDays(filterStart, 1);
        return projectStart >= filterStart && projectStart < filterEnd;
      } else {
        return projectEnd >= filterRange.start && projectStart <= filterRange.end;
      }
    })
    // Role filter
    .filter((proj) => {
      if (roleFilter === "All") return true;
      return proj.roles?.includes(roleFilter);
    })
    // Member count filter
    .filter((proj) => {
      if (memberCountFilter === "All") return true;
      const count = proj.memberCount || 0;
      if (memberCountFilter === "1-2") return count >= 1 && count <= 2;
      if (memberCountFilter === "3-5") return count >= 3 && count <= 5;
      if (memberCountFilter === "6+") return count >= 6;
      return true;
    })
    // Location label filter
    .filter((proj) => {
      if (!locationFilter) return true;
      return proj.location?.label === locationFilter;
    })
    // Participation type filter with explicit type guard
    .filter((proj) => {
      if (!locationTypeFilter) return true; // covers "" and undefined

      if (!validParticipationTypes.includes(locationTypeFilter as ParticipationType)) {
        return true; // ignore invalid filters defensively
      }

      return proj.participationType === locationTypeFilter;
    });
}