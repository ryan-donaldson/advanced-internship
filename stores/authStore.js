import { create } from "zustand";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  subscriptionStatus: "basic",
  authReady: false,

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

  guestLogin: () => {
    const guestUser = {
      email: "guest@gmail.com",
      uid: "guest-user",
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("guestUser", JSON.stringify(guestUser));
    }

    set({
      user: guestUser,
      isAuthenticated: true,
      subscriptionStatus: "basic",
      authReady: true,
    });
  },

  setAuthReady: (ready) =>
    set({
      authReady: ready,
    }),

  logoutUser: async () => {
    await signOut(auth);

    if (typeof window !== "undefined") {
      localStorage.removeItem("guestUser");
    }

    set({
      user: null,
      isAuthenticated: false,
      subscriptionStatus: "basic",
      authReady: false,
    });
  },

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
