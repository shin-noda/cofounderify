// src/components/signIn/SignInLinkToForgotPassword.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SignInLinkToForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <p className="mt-4 text-center text-sm text-blue-600 hover:underline cursor-pointer select-none">
      <span onClick={() => navigate("/forgotPassword")}>
        Forgot password?
      </span>
    </p>
  );
};

export default SignInLinkToForgotPassword;