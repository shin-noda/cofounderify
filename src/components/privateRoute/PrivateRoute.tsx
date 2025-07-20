// src/components/privateRoute/PrivateRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const PrivateRoute: React.FC = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false);

      if (firebaseUser) {
        setLoadingProfile(true);
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            // Check required fields for profile completeness here
            const isComplete =
              data.firstName && data.firstName.trim().length > 0 &&
              data.lastName && data.lastName.trim().length > 0 &&
              data.displayName && data.displayName.trim().length > 0 &&
              data.country && data.country.trim().length > 0 &&
              data.city && data.city.trim().length > 0 &&
              data.skills && Array.isArray(data.skills) && data.skills.length > 0;

            setProfileComplete(Boolean(isComplete));
          } else {
            // No profile doc found → incomplete
            setProfileComplete(false);
          }
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          setProfileComplete(false);
        } finally {
          setLoadingProfile(false);
        }
      } else {
        setProfileComplete(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loadingAuth || loadingProfile) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!user) {
    // Not logged in
    return <Navigate to="/signin" replace />;
  }

  if (!profileComplete && window.location.pathname !== "/completeProfile") {
    // Logged in but profile incomplete → redirect to complete profile
    return <Navigate to="/completeProfile" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;