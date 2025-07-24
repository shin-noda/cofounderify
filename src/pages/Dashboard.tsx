import React, { useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useFilter } from "../context/FilterContext";
import {
  getInitialFilters,
  syncFiltersToURL,
  applyAllFilters,
  getPresetRange,
} from "../utils/filterUtils";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../lib/firebase";
import DashboardAllFilterProject from "../components/dashboard/DashboardAllFilterProject";
import DashboardProjectList from "../components/dashboard/DashboardProjectList";
import DashboardProjectHeader from "../components/dashboard/DashboardProjectHeader";

const db = getFirestore(app);

function datesAreEqual(d1: Date, d2: Date) {
  return d1.getTime() === d2.getTime();
}

const Dashboard: React.FC = () => {
  const [locationFilter, setLocationFilter] = React.useState("");
  const [projects, setProjects] = React.useState<any[]>([]);
  const [locationTypeFilter, setLocationTypeFilter] = React.useState<
  "in-person" | "virtual" | "hybrid" | ""
>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitializing = useRef(true);
  const location = useLocation();

  const {
    roleFilter,
    setRoleFilter,
    memberCountFilter,
    setMemberCountFilter,
    searchQuery,
    setSearchQuery,
    filterRange,
    setFilterRange,
    rangeKeyword,
    setRangeKeyword,
  } = useFilter();

  const filteredProjects = applyAllFilters({
    projects,
    searchQuery,
    filterRange,
    roleFilter,
    memberCountFilter,
    locationFilter,
    locationTypeFilter,
  });

  const uniqueLocationLabels = React.useMemo(() => {
    const labels = projects
      .map((p) => p.location?.label)
      .filter((label): label is string => Boolean(label));
    return Array.from(new Set(labels)).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  useEffect(() => {
    const {
      initialRole,
      initialMembers,
      initialSearch,
      initialFilterRange,
      initialRangeKeyword,
    } = getInitialFilters(searchParams);

    setSearchQuery(initialSearch);
    setRoleFilter(initialRole);
    setMemberCountFilter(initialMembers);
    setRangeKeyword(initialRangeKeyword);

    // New: Set initial location filter from URL
    const locationParam = searchParams.get("location");
    if (locationParam) {
      setLocationFilter(locationParam);
    }

    if (initialFilterRange) {
      setFilterRange(initialFilterRange);
    } else {
      setFilterRange(null);
    }

    isInitializing.current = false;
  }, [searchParams]);

  useEffect(() => {
    const q = query(
      collection(db, "projects"),
      orderBy("startDateTime", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isInitializing.current) return;
    const params = new URLSearchParams(searchParams);
    if (locationFilter) {
      params.set("location", locationFilter);
    } else {
      params.delete("location");
    }
    setSearchParams(params);
  }, [locationFilter]);

  useEffect(() => {
    if (isInitializing.current) return;
    syncFiltersToURL({
      roleFilter,
      memberCountFilter,
      searchQuery,
      filterRange,
      rangeKeyword,
      setSearchParams,
    });
  }, [
    roleFilter,
    memberCountFilter,
    searchQuery,
    filterRange,
    rangeKeyword,
  ]);

  useEffect(() => {
    if (isInitializing.current) return;
    if (rangeKeyword) {
      const presetRange = getPresetRange(rangeKeyword);
      if (
        !filterRange ||
        !datesAreEqual(filterRange.start, presetRange!.start) ||
        !datesAreEqual(filterRange.end, presetRange!.end)
      ) {
        setFilterRange(presetRange);
      }
    }
  }, [rangeKeyword, filterRange]);

  useEffect(() => {
    if (!location.pathname.startsWith("/dashboard")) {
      setSearchQuery("");
      setFilterRange(null);
      setRangeKeyword(null);
      setRoleFilter("All");
      setMemberCountFilter("All");
      isInitializing.current = true;
    }
  }, [location.pathname]);

  return (
    <>
      <DashboardProjectHeader
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        availableLocations={uniqueLocationLabels}
      />

      <DashboardAllFilterProject
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterRange={filterRange}
        setFilterRange={setFilterRange}
        rangeKeyword={rangeKeyword}
        setRangeKeyword={setRangeKeyword}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        memberCountFilter={memberCountFilter}
        setMemberCountFilter={setMemberCountFilter}
        locationTypeFilter={locationTypeFilter}
        setLocationTypeFilter={setLocationTypeFilter} 
        filteredCount={filteredProjects.length}
      />

      <DashboardProjectList projects={filteredProjects} />
    </>
  );
};

export default Dashboard;