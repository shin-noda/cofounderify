import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useFilter } from "../../context/FilterContext";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { setSearchQuery, setFilterRange } = useFilter();

  // Listen for auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  // Close profile menu on outside click
  useEffect(() => {
    if (!profileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !profileMenuRef.current?.contains(target) &&
        !profileButtonRef.current?.contains(target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setProfileMenuOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Reset filters and navigate to dashboard on logo click
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSearchQuery("");
    setFilterRange(null);
    navigate("/dashboard");
  };

  // Toggle profile menu handler with optional event param
  const toggleProfileMenu = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProfileMenuOpen((open) => !open);
  };

  return (
    <nav className="w-full bg-black text-white fixed top-0 left-0 z-50 shadow-md">
      <div className="relative w-full flex items-center justify-between py-4 px-6">
        {/* Logo as a styled link with click handler */}
        <a
          href="/dashboard"
          onClick={handleLogoClick}
          className="font-bold text-xl absolute left-6 top-1/2 transform -translate-y-1/2 cursor-pointer select-none"
          aria-label="Go to dashboard"
        >
          CoFounderify
        </a>

        <div className="flex items-center justify-end flex-grow ml-24">
          <ul className="hidden md:flex space-x-6 items-center">
            <NavLinks
              user={user}
              profileMenuOpen={profileMenuOpen}
              toggleProfileMenu={toggleProfileMenu}
              profileMenuRef={profileMenuRef}
              profileButtonRef={profileButtonRef}
              handleLogout={handleLogout}
            />
          </ul>

          <button
            ref={toggleButtonRef}
            className="md:hidden text-2xl focus:outline-none ml-4 select-none"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((open) => !open);
            }}
            aria-label="Toggle menu"
            type="button"
          >
            {isOpen ? "×" : "≡"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black px-6 pb-4">
          <MobileMenu
            user={user}
            isOpen={isOpen}
            closeMenu={() => setIsOpen(false)}
            profileMenuOpen={profileMenuOpen}
            toggleProfileMenu={toggleProfileMenu}
            profileMenuRef={profileMenuRef}
            profileButtonRef={profileButtonRef}
            handleLogout={handleLogout}
          />
        </div>
      )}
    </nav>
  );
};

export default Navigation;