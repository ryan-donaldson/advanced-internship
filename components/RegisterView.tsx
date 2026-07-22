"use client";

import Image from "next/image";
import googleIcon from "../public/google.png";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

type LoginViewProps = {
  setAuthMode: (mode: "login" | "register" | "forgot") => void;
  closeLogin: () => void;
};

export default function RegisterView({
  setAuthMode,
  closeLogin,
}: LoginViewProps) {
  const registerUser = useAuthStore((s) => s.registerUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.SubmitEvent) {
  e.preventDefault();

  if (!email.includes("@")) {
    setError("Invalid email");
    return;
  }

  if (password.length < 6) {
    setError("Short password");
    return;
  }

  try {
    // 1. Create Firebase Auth user
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // 2. Create Firestore user document
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      subscriptionStatus: "basic",
    });

    // 3. Update Zustand store
    registerUser(user);

    // 4. Close modal + redirect
    closeLogin();
    router.push("/for-you");

  } catch (err: any) {
    switch (err.code) {
      case "auth/email-already-in-use":
        setError("Email already in use");
        break;
      case "auth/invalid-email":
        setError("Invalid email format");
        break;
      case "auth/weak-password":
        setError("Password must be at least 6 characters");
        break;
      default:
        setError("Something went wrong");
    }
  }
}

  return (
    <>
      <div className="auth__content">
        <div className="auth__title">Sign up to Summarist</div>

        {error && <div className="auth__error">{error}</div>}

        <button className="btn google__btn--wrapper">
          <figure className="google__icon--mask">
            <Image
              src={googleIcon}
              alt="google"
              width={40}
              height={40}
              priority
            />
          </figure>
          <div>Sign up with Google</div>
        </button>
        <div className="auth__separator">
          <span className="auth__separator--text">or</span>
        </div>
        <form className="auth__main--form" onSubmit={handleRegister}>
          <input
            className="auth__main--input"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth__main--input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn">
            <span>Sign up</span>
          </button>
        </form>
      </div>
      <button
        className="auth__switch--btn"
        onClick={() => setAuthMode("login")}
      >
        Already have an account?
      </button>
    </>
  );
}
