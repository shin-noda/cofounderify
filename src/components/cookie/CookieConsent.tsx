// src/components/CookieConsent.tsx
import React, { useState, useEffect } from "react";

const COOKIE_NAME = "cofounderify_cookie_consent";

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_NAME);
    if (!consent) setShowBanner(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_NAME, "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem(COOKIE_NAME, "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50">
      <p className="mb-2 md:mb-0">
        We use cookies to improve your experience. By continuing, you agree to our{" "}
        <button
          className="underline hover:text-gray-300"
          onClick={() => window.location.href = "/cookie-policy"}
        >
          Cookie Policy
        </button>.
      </p>
      <div className="space-x-2">
        <button
          onClick={acceptCookies}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Accept
        </button>
        <button
          onClick={rejectCookies}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;