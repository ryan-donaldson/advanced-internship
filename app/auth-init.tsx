"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuthStore } from "@/stores/authStore";

export default function AuthInit() {
  useEffect(() => {
  console.log("AUTH INIT RAN");

  const unsubscribe = onAuthStateChanged(
    auth,
    (firebaseUser) => {
      const savedGuest = localStorage.getItem("guestUser");

      console.log("FIREBASE USER:", firebaseUser);
      console.log("SAVED GUEST:", savedGuest);

      if (firebaseUser) {
        useAuthStore.setState({
          user: firebaseUser,
          isAuthenticated: true,
          authReady: true,
        });

        console.log(
          "FIREBASE STATE:",
          useAuthStore.getState(),
        );

        return;
      }

      if (savedGuest) {
        const guestUser = JSON.parse(savedGuest);

        useAuthStore.setState({
          user: guestUser,
          isAuthenticated: true,
          subscriptionStatus: "basic",
          authReady: true,
        });

        console.log(
          "RESTORED GUEST STATE:",
          useAuthStore.getState(),
        );

        return;
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
}