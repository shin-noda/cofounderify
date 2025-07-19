// src/components/navigation/Navigation.tsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  const toggleProfileMenu = () => setProfileMenuOpen((prev) => !prev);

  useEffect(() => {
    if (!profileMenuOpen) return; // Only add listener if menu is open

    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="w-full bg-black text-white px-6 py-4 fixed top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <NavLink to="/dashboard" className="font-bold text-xl" end>
          CoFounderify
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 items-center">
          <NavLinks
            profileMenuOpen={profileMenuOpen}
            toggleProfileMenu={toggleProfileMenu}
            profileMenuRef={profileMenuRef}
            profileButtonRef={profileButtonRef}
            handleLogout={handleLogout}
          />
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

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        closeMenu={closeMenu}
        profileMenuOpen={profileMenuOpen}
        toggleProfileMenu={toggleProfileMenu}
        profileMenuRef={profileMenuRef}
        profileButtonRef={profileButtonRef}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navigation;