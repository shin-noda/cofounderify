// src/pages/SignIn.tsx
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  SignInEmailInput,
  SignInPasswordInput,
  SignInGoogleButton,
  SignInSubmitButton,
  SignInDividerOr,
  SignInErrorMessage,
  SignInLinkToRegister,
} from "../components/signIn";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError("Email or password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

      <SignInErrorMessage message={error} />

      <SignInGoogleButton onClick={handleGoogleSignIn} disabled={loading} />

      <SignInDividerOr />

      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <SignInEmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />

        <SignInPasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SignInSubmitButton loading={loading} />
      </form>

      <SignInLinkToRegister />
    </div>
  );
};

export default SignIn;