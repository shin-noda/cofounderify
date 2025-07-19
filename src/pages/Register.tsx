// src/pages/Register.tsx
import React from "react";
import RegisterForm from "../components/register/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;