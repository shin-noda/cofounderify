import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return { user };
}
