// src/components/signIn/SignInLinkToRegister.tsx
import React from "react";
import { Link } from "react-router-dom";

const SignInLinkToRegister: React.FC = () => (
  <p className="mt-6 text-center text-gray-600">
    New here?{" "}
    <Link to="/" className="text-blue-600 hover:underline font-semibold">
      Register
    </Link>
  </p>
);

export default SignInLinkToRegister;