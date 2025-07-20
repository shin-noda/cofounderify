// src/pages/NotFound.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-24 px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Logo image from /public/logo.png */}
      <img
        src="/logo.png"
        alt="CoFounderify Logo"
        className="mx-auto mb-6 w-32 h-32 object-contain"
      />

      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;