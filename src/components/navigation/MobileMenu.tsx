import React, { useEffect, useRef } from "react";
import NavLinks from "./NavLinks";
import type { User } from "firebase/auth";

type MobileMenuProps = {
  user: User | null;
  isOpen: boolean;
  closeMenu: () => void;
  profileMenuOpen: boolean;
  toggleProfileMenu: () => void;
  profileMenuRef: React.RefObject<HTMLDivElement | null>;
  profileButtonRef: React.RefObject<HTMLButtonElement | null>;
  handleLogout: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  user,
  isOpen,
  closeMenu,
  profileMenuOpen,
  toggleProfileMenu,
  profileMenuRef,
  profileButtonRef,
  handleLogout,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Ignore if clicking the toggle button
      const toggleButton = document.querySelector('[aria-label="Toggle menu"]');
      if (toggleButton && toggleButton.contains(target)) {
        return; // Ignore this click
      }

      if (menuRef.current && !menuRef.current.contains(target)) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  if (!isOpen) return null;

  return (
    <ul
      ref={menuRef}
      className="md:hidden mt-4 space-y-3 px-2"
    >
      <NavLinks
        user={user}
        profileMenuOpen={profileMenuOpen}
        toggleProfileMenu={toggleProfileMenu}
        profileMenuRef={profileMenuRef}
        profileButtonRef={profileButtonRef}
        handleLogout={() => {
          handleLogout();
          closeMenu();
        }}
        isMobile={true}
        closeMenu={closeMenu} // pass closeMenu down here
      />
    </ul>
  );
};

export default MobileMenu;