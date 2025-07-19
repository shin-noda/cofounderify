// src/components/ErrorMessage.tsx
import React from "react";

type Props = {
  message: string | null;
};

const RegisterErrorMessage: React.FC<Props> = ({ message }) => {
  if (!message) return null;

  return <p className="text-red-600 mt-2">{message}</p>;
};

export default RegisterErrorMessage;
