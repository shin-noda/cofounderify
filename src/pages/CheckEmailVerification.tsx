import React from "react";
import { useNavigate } from "react-router-dom";

const CheckEmailVerification: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gray-50 p-6 pt-16">
      <div className="max-w-md bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-semibold mb-4">Thank you for signing up!</h1>
        
        {/* Logo below the heading */}
        <img
          src="/public/logo.png"
          alt="Logo"
          className="mx-auto mb-6 w-32 h-32 object-contain"
        />

        <p className="mb-4 text-gray-700">
          We’ve sent a verification email to your inbox.
        </p>
        <p className="mb-6 text-gray-600">
          Please check your email and click the verification link to activate your account.
          Don't forget to check your spam or junk folder just in case.
        </p>

        <button
          onClick={() => navigate("/signin")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
};

export default CheckEmailVerification;