// src/components/signIn/SubmitButton.tsx
import React from "react";

interface Props {
  loading: boolean;
  disabled?: boolean;
}

const SignInSubmitButton: React.FC<Props> = ({ loading, disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
  >
    {loading ? "Signing In..." : "Sign In"}
  </button>
);

export default SignInSubmitButton;