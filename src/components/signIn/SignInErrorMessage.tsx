// src/components/signIn/ErrorMessage.tsx
import React from "react";

interface Props {
  message: string | null;
}

const SignInErrorMessage: React.FC<Props> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{message}</div>
  );
};

export default SignInErrorMessage;
