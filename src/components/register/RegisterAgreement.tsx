import React from 'react';

const RegisterAgreement: React.FC = () => {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="text-center text-sm text-gray-600 mb-4">
      <span>By signing up, you agree to </span>
      <button
        type="button"
        onClick={() => handleLinkClick('/terms')}
        className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
      >
        Terms of Service
      </button>
      <span>, </span>
      <button
        type="button"
        onClick={() => handleLinkClick('/privacy')}
        className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
      >
        Privacy Policy
      </button>
      <span>, and </span>
      <button
        type="button"
        onClick={() => handleLinkClick('/cookiePolicy')}
        className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
      >
        Cookie Policy
      </button>
      <span>.</span>
    </div>
  );
};

export default RegisterAgreement;