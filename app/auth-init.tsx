"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuthStore } from "@/stores/authStore";

export default function AuthInit() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          useAuthStore.setState({
            user: firebaseUser,
            isAuthenticated: true,
            authReady: true,
          });
          return;
        }

        const savedGuest =
          localStorage.getItem("guestUser");

        if (savedGuest) {
          try {
            const guestUser = JSON.parse(savedGuest);

            useAuthStore.setState({
              user: guestUser,
              isAuthenticated: true,
              subscriptionStatus: "basic",
              authReady: true,
            });

            return;
          } catch {
            localStorage.removeItem("guestUser");
          }
        }

        useAuthStore.setState({
          user: null,
          isAuthenticated: false,
          subscriptionStatus: "basic",
          authReady: true,
        });
      },
    );

    return unsubscribe;
  }, []);

  return null;
}