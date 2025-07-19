// src/components/Navigation.tsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/dashboard" },  // changed from "/" to "/dashboard"
  { name: "Create Project", path: "/create" },
  { name: "Map", path: "/map" },
  { name: "Profile Form", path: "/form" },
  { name: "Public Feed", path: "/feed" },
  { name: "About", path: "/about" },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-black text-white px-6 py-4 fixed top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo now goes to /dashboard */}
        <NavLink to="/dashboard" className="font-bold text-xl" end>
          CoFounderify
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? "×" : "≡"}
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-3 px-2">
          {links.map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-1 px-2 rounded hover:bg-gray-800 ${isActive ? "bg-gray-800 font-semibold" : ""}`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navigation;