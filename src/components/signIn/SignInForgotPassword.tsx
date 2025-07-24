// src/components/signIn/SignInForgotPassword.tsx
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignInForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
      setEmail("");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>

      <input
        type="email"
        placeholder="Enter your email for password reset"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
      />

      <button
        onClick={handleReset}
        disabled={loading}
        className="bg-gray-600 text-white px-5 py-2 rounded hover:bg-gray-700 transition w-full"
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </button>

      <p
        onClick={() => navigate("/signin")}
        className="mt-6 text-blue-600 hover:underline cursor-pointer select-none"
      >
        &larr; Back to Sign In
      </p>
    </div>
  );
};

export default SignInForgotPassword;