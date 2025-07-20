import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  const toggleProfileMenu = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProfileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!profileMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const clickedTarget = event.target as Node;
      const isInsideMenu = profileMenuRef.current?.contains(clickedTarget);
      const isInsideButton = profileButtonRef.current?.contains(clickedTarget);

      if (!isInsideMenu && !isInsideButton) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen]);

  useEffect(() => {
    setProfileMenuOpen(false);
    closeMenu();
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

  return (
    <nav className="w-full bg-black text-white fixed top-0 left-0 z-50 shadow-md">
      <div className="relative w-full flex items-center justify-between py-4 px-6">
        {/* Logo absolutely positioned left but relative to this container */}
        <NavLink
          to="/dashboard"
          className="font-bold text-xl absolute left-6 top-1/2 transform -translate-y-1/2"
          end
        >
          CoFounderify
        </NavLink>

        {/* Nav links and hamburger: stretch full width, pushed right */}
        <div className="flex items-center justify-end flex-grow ml-24">
          {/* Desktop nav */}
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

          {/* Mobile hamburger */}
          <button
            ref={toggleButtonRef}
            className="md:hidden text-2xl focus:outline-none ml-4"
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            aria-label="Toggle menu"
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
            closeMenu={closeMenu}
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