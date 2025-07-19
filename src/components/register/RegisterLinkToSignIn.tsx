// src/components/register/RegisterLinkToSignIn.tsx
import React from "react";
import { Link } from "react-router-dom";

const RegisterLinkToSignIn: React.FC = () => {
  return (
    <p className="mt-6 text-center text-gray-600">
      Already have an account?{" "}
      <Link
        to="/signin"
        className="text-blue-600 hover:underline font-semibold"
      >
        Sign in
      </Link>
    </p>
  );
};

export default RegisterLinkToSignIn;