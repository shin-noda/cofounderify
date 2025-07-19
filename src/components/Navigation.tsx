// src/components/Navigation.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Create Project", path: "/create" },
  { name: "Map", path: "/map" },
  { name: "Profile Form", path: "/form" },
  { name: "Public Feed", path: "/feed" },
  { name: "About", path: "/about" },
];

const Navigation: React.FC = () => {
  return (
    <nav className="w-full bg-black text-white flex justify-between items-center px-6 py-4 fixed top-0 left-0 z-50 shadow-md">
      <NavLink
        to="/"
        className="font-bold text-xl"
        end
      >
        CoFounderify
      </NavLink>

      <ul className="flex space-x-6">
        {links.map(({ name, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              end
              className={({ isActive }) =>
                `cursor-pointer hover:underline ${isActive ? "underline font-semibold" : ""}`
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;