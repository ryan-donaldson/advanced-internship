"use client"

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });

    return () => unsubscribe();
  }, [setUser]);

  return children;
}