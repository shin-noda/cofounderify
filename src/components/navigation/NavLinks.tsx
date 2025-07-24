import React from "react";
import { NavLink } from "react-router-dom";
import type { User } from "firebase/auth";
import NavigationProfileLogo from "./NavigationProfileLogo";

interface UserProfileData {
  photoURL?: string | null;
  displayName?: string | null;
  // Add any other profile fields you use
}

interface NavLinksProps {
  user: User | null;
  userProfile?: UserProfileData | null;
  profileMenuOpen: boolean;
  toggleProfileMenu: (e?: React.MouseEvent) => void; // accept optional event
  profileMenuRef: React.RefObject<HTMLDivElement | null>;
  profileButtonRef: React.RefObject<HTMLButtonElement | null>; // Change to image ref
  handleLogout: () => void;
  isMobile?: boolean;
  closeMenu?: () => void; // Optional callback to close mobile menu
}

const links = [
  { name: "Create Project", path: "/create" },
  { name: "Public Feed", path: "/feed" },
  { name: "About", path: "/about" },
];

const NavLinks: React.FC<NavLinksProps> = ({
  user,
  userProfile,
  profileMenuOpen,
  toggleProfileMenu,
  profileMenuRef,
  profileButtonRef,
  handleLogout,
  isMobile = false,
  closeMenu,
}) => {
  const profilePhotoURL = userProfile?.photoURL ?? "";

  const getInitials = () => {
    const name = userProfile?.displayName ?? user?.displayName ?? "User";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
    );
  };

  const handleLinkClick = () => {
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  return (
    <>
      {links.map(({ name, path }) => (
        <li key={path}>
          <NavLink
            to={path}
            end
            onClick={handleLinkClick}
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

      {user ? (
        <li className="relative flex items-center">
          {/* Use NavigationProfileLogo if profilePhotoURL exists, else initials button */}
          {profilePhotoURL ? (
            <NavigationProfileLogo
              photoURL={profilePhotoURL}
              altText={`${userProfile?.displayName ?? user?.displayName ?? "User"}'s profile`}
              onClick={(e) => {
                e.stopPropagation();
                toggleProfileMenu();
              }}
              ref={profileButtonRef} // Pass ref here, must match forwarded ref type
            />
          ) : (
            <button
              ref={profileButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                toggleProfileMenu(e);
              }}
              aria-label="Toggle profile menu"
              className={`${
                isMobile ? "ml-0" : "ml-4"
              } w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-semibold hover:bg-gray-600`}
            >
              {getInitials()}
            </button>
          )}

          {profileMenuOpen && (
            <div
              ref={profileMenuRef}
              className={`absolute ${
                isMobile ? "left-0" : "right-0"
              } top-full mt-2 w-48 bg-white text-black rounded shadow-lg z-50 p-2`}
            >
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleProfileMenu(e);
                  }}
                  aria-label="Close profile menu"
                  className="text-2xl font-normal text-black hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <NavLink
                to={`/profile/${user.uid}`}
                onClick={() => {
                  toggleProfileMenu();
                  if (isMobile && closeMenu) closeMenu();
                }}
                className="mt-2 block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                View Profile
              </NavLink>

              <NavLink
                to="/myProjects"
                onClick={() => {
                  toggleProfileMenu();
                  if (isMobile && closeMenu) closeMenu();
                }}
                className="mt-2 block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                View Your Projects
              </NavLink>

              <button
                onClick={() => {
                  handleLogout();
                  if (isMobile && closeMenu) closeMenu();
                }}
                className="mt-2 block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600"
              >
                Log Out
              </button>
            </div>
          )}
        </li>
      ) : (
        <>
          {isMobile ? (
            <>
              <li>
                <NavLink
                  to="/signin"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `cursor-pointer hover:underline ${
                      isActive ? "underline font-semibold" : ""
                    }`
                  }
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `cursor-pointer hover:underline ${
                      isActive ? "underline font-semibold" : ""
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li className="flex space-x-4 ml-4">
              <NavLink
                to="/signin"
                className="px-3 py-1 rounded hover:bg-gray-700"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-1 rounded hover:bg-gray-700"
              >
                Register
              </NavLink>
            </li>
          )}
        </>
      )}
    </>
  );
};

export default NavLinks;