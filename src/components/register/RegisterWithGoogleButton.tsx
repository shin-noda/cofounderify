// src/components/register/RegisterGoogleButton.tsx
import React from "react";
import googleLogo from "../../assets/google-logo.png";
import type { SignInGoogleButtonProps } from "../../types/authTypes";

const RegisterGoogleButton: React.FC<SignInGoogleButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-3
        w-full max-w-md h-10
        bg-white border border-gray-300 rounded
        text-gray-900 font-medium text-sm
        transition 
        disabled:opacity-60 disabled:cursor-not-allowed
        hover:bg-gray-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      `}
    >
      <img src={googleLogo} alt="Google logo" className="w-5 h-5" />
      <span>Sign up with Google</span>
    </button>
  );
};

export default RegisterGoogleButton;