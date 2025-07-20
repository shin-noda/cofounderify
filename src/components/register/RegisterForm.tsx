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
    try {
      await signInWithPopup(auth, provider);
      navigate("/completeProfile");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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

      <RegisterErrorMessage message={error} />

      <RegisterLinkToSignIn />
    </div>
  );
};

export default RegisterForm;