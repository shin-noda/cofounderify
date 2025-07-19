// src/components/navigation/MobileMenu.tsx
import React from "react";
import NavLinks from "./NavLinks";

type MobileMenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
  profileMenuOpen: boolean;
  toggleProfileMenu: () => void;
  profileMenuRef: React.RefObject<HTMLDivElement | null>;
  profileButtonRef: React.RefObject<HTMLButtonElement | null>;
  handleLogout: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  closeMenu,
  profileMenuOpen,
  toggleProfileMenu,
  profileMenuRef,
  profileButtonRef,
  handleLogout,
}) => {
  if (!isOpen) return null;

  return (
    <ul className="md:hidden mt-4 space-y-3 px-2">
      <NavLinks
        profileMenuOpen={profileMenuOpen}
        toggleProfileMenu={toggleProfileMenu}
        profileMenuRef={profileMenuRef}
        profileButtonRef={profileButtonRef}
        handleLogout={() => {
          handleLogout();
          closeMenu();
        }}
        isMobile={true} // <== Pass isMobile here!
      />
    </ul>
  );
};

export default MobileMenu;