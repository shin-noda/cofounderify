// src/components/register/RegisterForm.tsx
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  RegisterErrorMessage,
  RegisterLinkToSignIn,
  RegisterSubmitButton,
  RegisterDividerOr,
  RegisterGoogleButton,
  RegisterEmailInput,
  RegisterPasswordInput,
} from ".";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/completeProfile");
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError(null);
    setLoading(true);

    const popupTimeout = setTimeout(() => {
      setLoading(false); // fallback in case of freeze
    }, 3000);

    try {
      await signInWithPopup(auth, provider);
      clearTimeout(popupTimeout);
      navigate("/completeProfile");
    } catch (err: any) {
      clearTimeout(popupTimeout);

      if (
        err.code === "auth/popup-closed-by-user" ||
        err.code === "auth/cancelled-popup-request"
      ) {
        // Silent cancel — don't show error
      } else {
        setError(err.message || "Google sign-up failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <RegisterErrorMessage message={error} />

      <RegisterGoogleButton
        onClick={handleGoogleRegister}
        disabled={loading}
      />

      <RegisterDividerOr />

      <form onSubmit={handleEmailRegister} className="space-y-4">
        <RegisterEmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <RegisterPasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <RegisterSubmitButton loading={loading} />
      </form>

      <RegisterLinkToSignIn />
    </div>
  );
};

export default RegisterForm;