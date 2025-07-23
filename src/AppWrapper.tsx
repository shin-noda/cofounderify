// src/AppWrapper.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { FilterProvider } from "./context/FilterContext"; // import FilterProvider

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <FilterProvider>
        <App />
      </FilterProvider>
    </Router>
  );
};

export default AppWrapper;