// src/components/register/RegisterForm.tsx
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {
  RegisterErrorMessage,
  RegisterLinkToSignIn,
  RegisterSubmitButton,
  RegisterDividerOr,
  RegisterGoogleButton,
  RegisterEmailInput,
  RegisterPasswordInput,
} from ".";
import { toast } from "react-hot-toast";

const auth = getAuth();
const db = getFirestore();
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        toast.success("Verification email sent! Please check your inbox.");
        navigate("/checkEmailVerification"); // A page you create to instruct email verification
      }
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
      setLoading(false);
    }, 3000);

    try {
      const result = await signInWithPopup(auth, provider);
      clearTimeout(popupTimeout);

      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        toast.success("Welcome back! You've already registered.");
        navigate("/dashboard");
      } else {
        navigate("/completeProfile");
      }
    } catch (err: any) {
      clearTimeout(popupTimeout);
      if (
        err.code === "auth/popup-closed-by-user" ||
        err.code === "auth/cancelled-popup-request"
      ) {
        // Silent cancel
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

      <RegisterGoogleButton onClick={handleGoogleRegister} disabled={loading} />

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