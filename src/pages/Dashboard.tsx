import React, { useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useFilter } from "../context/FilterContext";
import { getInitialFilters, syncFiltersToURL, applyAllFilters, getPresetRange } from "../helpers/filterUtils";
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { app } from "../lib/firebase";
import AllFilterProject from "../components/dashboard/DashboardAllFilterProject";
import ProjectList from "../components/dashboard/DashboardProjectList";

const db = getFirestore(app);

function datesAreEqual(d1: Date, d2: Date) {
  return d1.getTime() === d2.getTime();
}

const Dashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  const [projects, setProjects] = React.useState<any[]>([]);
  const isInitializing = useRef(true);

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

    if (initialFilterRange) {
      setFilterRange(initialFilterRange);
    } else {
      setFilterRange(null);
    }

    isInitializing.current = false;
  }, [searchParams, setSearchQuery, setRoleFilter, setMemberCountFilter, setRangeKeyword, setFilterRange]);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("startDateTime", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    });
    return () => unsubscribe();
  }, []);

  // Sync state to URL except on initial load
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
  }, [roleFilter, memberCountFilter, searchQuery, filterRange, rangeKeyword, setSearchParams]);

  // Manage filterRange based on rangeKeyword — simplified, no "custom" case
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
  }, [rangeKeyword, filterRange, setFilterRange]);

  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.startsWith("/dashboard")) {
      setSearchQuery("");
      setFilterRange(null);
      setRangeKeyword(null);
      setRoleFilter("All");
      setMemberCountFilter("All");
      isInitializing.current = true;
    }
  }, [location.pathname, setSearchQuery, setFilterRange, setRangeKeyword, setRoleFilter, setMemberCountFilter]);

  const filteredProjects = applyAllFilters({
    projects,
    searchQuery,
    filterRange,
    roleFilter,
    memberCountFilter,
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">Projects</h1>

      <AllFilterProject
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
        filteredCount={filteredProjects.length}
      />

      <ProjectList projects={filteredProjects} />
    </>
  );
};

export default Dashboard;