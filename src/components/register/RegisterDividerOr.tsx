// src/components/signIn/DividerOr.tsx
import React from "react";

const RegisterDividerOr: React.FC = () => (
  <div className="flex items-center my-4">
    <hr className="flex-grow border-gray-300" />
    <span className="mx-2 text-gray-500">or</span>
    <hr className="flex-grow border-gray-300" />
  </div>
);

export default RegisterDividerOr;