import { create } from "zustand";
import { auth } from "@/firebase/config";
import {  onAuthStateChanged } from "firebase/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  subscriptionStatus: "basic",

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setSubscriptionStatus: (status) =>
    set({
      subscriptionStatus: status,
    }),

  registerUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  loginUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  guestLogin: () =>
    set({
      user: {
        email: "guest@gmail.com",
        uid: "guest-user",
      },
      isAuthenticated: true,
      subscriptionStatus: "basic",
    }),

  logoutUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      subscriptionStatus: "basic",
    }),

  devPremiumLogin: () =>
    set({
      user: {
        email: "premium@test.com",
        uid: "dev-premium-user",
      },
      isAuthenticated: true,
      subscriptionStatus: "premium",
    }),
}));

// For settings page
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({
    user,
    isAuthenticated: !!user,
  });
});
