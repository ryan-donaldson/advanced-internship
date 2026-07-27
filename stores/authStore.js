import { create } from "zustand";
import { auth } from "@/firebase/config";
import {  onAuthStateChanged, signOut } from "firebase/auth";

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


logoutUser: async () => {
  await signOut(auth);

  if (typeof window !== "undefined") {
    localStorage.removeItem("guestUser");
  }

  set({
    user: null,
    isAuthenticated: false,
    subscriptionStatus: "basic",
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

onAuthStateChanged(auth, (user) => {
  // Firebase user exists → use it
  if (user) {
    useAuthStore.setState({
      user,
      isAuthenticated: true,
      authReady: true,
    });
    return;
  }

  // Guest user only exists in the browser
  if (typeof window !== "undefined") {
    const guest = localStorage.getItem("guestUser");
    if (guest) {
      useAuthStore.setState({
        user: JSON.parse(guest),
        isAuthenticated: true,
      });
      return;
    }
  }

  // No user at all
  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
  });
});


