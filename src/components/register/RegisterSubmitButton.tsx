// src/components/register/RegisterSubmitButton.tsx
import React from "react";

interface RegisterSubmitButtonProps {
  loading: boolean;
}

const RegisterSubmitButton: React.FC<RegisterSubmitButtonProps> = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? "Registering..." : "Register"}
    </button>
  );
};

export default RegisterSubmitButton;