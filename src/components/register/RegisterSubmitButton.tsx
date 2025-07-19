// src/components/RegisterSubmitButton.tsx
import React from "react";

type Props = {
  loading: boolean;
  onClick: () => void;
};

const RegisterSubmitButton: React.FC<Props> = ({ loading, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
    >
      {loading ? "Signing in..." : "Sign in with Google & Register"}
    </button>
  );
};

export default RegisterSubmitButton;