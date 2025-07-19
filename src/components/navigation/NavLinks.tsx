// src/components/navigation/NavLinks.tsx
import React from "react";
import { NavLink } from "react-router-dom";

interface NavLinksProps {
  profileMenuOpen: boolean;
  toggleProfileMenu: () => void;
  profileMenuRef: React.RefObject<HTMLDivElement | null>;
  profileButtonRef: React.RefObject<HTMLButtonElement | null>;
  handleLogout: () => void;
  isMobile?: boolean; // Optional prop to handle mobile styling if needed
}

const links = [
  { name: "Home", path: "/dashboard" },
  { name: "Create Project", path: "/create" },
  { name: "Map", path: "/map" },
  { name: "Profile Form", path: "/form" },
  { name: "Public Feed", path: "/feed" },
  { name: "About", path: "/about" },
];

const NavLinks: React.FC<NavLinksProps> = ({
  profileMenuOpen,
  toggleProfileMenu,
  profileMenuRef,
  profileButtonRef,
  handleLogout,
  isMobile = false,
}) => {
  return (
    <>
      {links.map(({ name, path }) => (
        <li key={path}>
          <NavLink
            to={path}
            end
            className={({ isActive }) =>
              `cursor-pointer hover:underline ${
                isActive ? "underline font-semibold" : ""
              }`
            }
          >
            {name}
          </NavLink>
        </li>
      ))}

      <li className="relative flex items-center">
        <button
          ref={profileButtonRef}
          onClick={toggleProfileMenu}
          aria-label="Toggle profile menu"
          className={`${
            isMobile ? "ml-0" : "ml-4"
          } w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-semibold hover:bg-gray-600`}
        >
          U
        </button>

        {profileMenuOpen && (
          <div
            ref={profileMenuRef}
            className={`absolute ${
              isMobile ? "left-0" : "right-0"
            } top-full mt-2 w-40 bg-white text-black rounded shadow-lg z-50 p-2`}
          >
            <div className="flex justify-end">
              <button
                onClick={toggleProfileMenu}
                aria-label="Close profile menu"
                className="text-2xl font-normal text-black hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="mt-2 block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600"
            >
              Log Out
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default NavLinks;