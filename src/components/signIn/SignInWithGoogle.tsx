// src/components/signIn/GoogleSignIn.tsx
import React from "react";
import SignInGoogleButton from "./SignInGoogleButton";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const SignInWithGoogle: React.FC<Props> = ({ onClick, disabled }) => (
  <SignInGoogleButton onClick={onClick} disabled={disabled} />
);

export default SignInWithGoogle;