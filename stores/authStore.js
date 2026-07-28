import { create } from "zustand";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

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

onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    useAuthStore.setState({
      user: firebaseUser,
      isAuthenticated: true,
      authReady: true,
    });

    return;
  }

  const savedGuest =
    typeof window !== "undefined"
      ? localStorage.getItem("guestUser")
      : null;

  if (savedGuest) {
    const guestUser = JSON.parse(savedGuest);

    useAuthStore.setState({
      user: guestUser,
      isAuthenticated: true,
      subscriptionStatus: "basic",
      authReady: true,
    });

    return;
  }

  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
    subscriptionStatus: "basic",
    authReady: true,
  });
});
