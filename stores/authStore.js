import { create } from "zustand";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useAuthStore = create((set) => ({
  // STATE
  user: null,
  isAuthenticated: false,
  subscriptionStatus: "Basic", // basic | premium | premium-plus

  // ACTIONS
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setSubscriptionStatus: (status) =>
    set({
      subscriptionStatus: status,
    }),

  // Call after user is registered in Firebase
  registerUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  // Call after Firebase login
  loginUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  // Guest login (hardcoded credentials)
  guestLogin: () =>
    set({
      user: {
        email: "guest@gmail.com",
        uid: "guest-user",
      },
      isAuthenticated: true,
      subscriptionStatus: "basic",
    }),

  // Logout
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

export async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const user = cred.user;

  // Save user in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    subscriptionStatus: "basic",
  });

  return user;
}