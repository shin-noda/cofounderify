import React from "react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const links = [
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
    { label: "Privacy Policy", page: "privacy" },
    { label: "Terms of Use", page: "terms" },
  ];

  return (
    <footer className="bg-black text-white text-center py-3 w-full">
      <nav aria-label="Footer navigation" className="inline-block">
        <ul className="flex justify-center text-sm items-center">
          {links.map(({ label, page }, index) => (
            <React.Fragment key={page}>
              {index !== 0 && (
                <li className="mx-2 text-white select-none">|</li>
              )}
              <li>
                <button
                  onClick={() => onNavigate(page)}
                  className="hover:text-gray-400 focus:outline-none px-2"
                >
                  {label}
                </button>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>
      <p className="mt-1 text-sm">© {new Date().getFullYear()} CoFounderify</p>
    </footer>
  );
};

export default Footer;