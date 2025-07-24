import React from "react";

interface NavigationProfileLogoProps {
  photoURL: string;
  altText: string;
  onClick: (e: React.MouseEvent) => void;
}

const NavigationProfileLogo = React.forwardRef<HTMLElement, NavigationProfileLogoProps>(
  ({ photoURL, altText, onClick }, ref) => {
    return (
      <img
        src={photoURL}
        alt={altText}
        onClick={onClick}
        ref={ref as React.RefObject<HTMLImageElement>}
        className="w-8 h-8 rounded-full object-cover cursor-pointer"
      />
    );
  }
);

export default NavigationProfileLogo;
