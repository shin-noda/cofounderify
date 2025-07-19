import React from "react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black text-white text-center py-3 w-full">
      <p className="text-sm space-x-4">
        <button
          onClick={() => onNavigate("about")}
          className="underline hover:text-gray-400"
        >
          About
        </button>{" "}
        |{" "}
        <button
          onClick={() => onNavigate("contact")}
          className="underline hover:text-gray-400"
        >
          Contact
        </button>{" "}
        |{" "}
        <button
          onClick={() => onNavigate("privacy")}
          className="underline hover:text-gray-400"
        >
          Privacy Policy
        </button>{" "}
        |{" "}
        <button
          onClick={() => onNavigate("terms")}
          className="underline hover:text-gray-400"
        >
          Terms of Use
        </button>
      </p>
      <p className="mt-1 text-sm">© {new Date().getFullYear()} CoFounderify</p>
    </footer>
  );
};

export default Footer;