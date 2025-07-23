import React, { useState, useEffect } from "react";
import type { SearchBarProps } from "../../types/SearchBar";

const DashboardSearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  value = "",
  placeholder = "Search projects...",
  debounceTime = 300,
}) => {
  const [input, setInput] = useState(value); // initialize with value

  useEffect(() => {
    setInput(value); // keep local input in sync with value prop
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(input.trim());
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [input, onSearch, debounceTime]);

  return (
    <input
      type="search"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-md p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
};

export default DashboardSearchBar;