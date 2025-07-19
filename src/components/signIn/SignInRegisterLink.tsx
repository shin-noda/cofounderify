// src/components/signIn/RegisterLink.tsx
import React from "react";
import { Link } from "react-router-dom";

const SignInRegisterLink: React.FC = () => (
  <p className="mt-6 text-center text-gray-600">
    New here?{" "}
    <Link to="/" className="text-blue-600 hover:underline font-semibold">
      Register
    </Link>
  </p>
);

export default SignInRegisterLink;