"use client";

import Image from "next/image";
import googleIcon from "../public/google.png";
import LoginButton from "./LoginButton";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "../stores/authStore";
import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

type LoginViewProps = {
  setAuthMode: (mode: "login" | "register" | "forgot") => void;
  closeLogin: () => void;
};

export default function LoginView({ setAuthMode, closeLogin }: LoginViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const guestLogin = useAuthStore((s) => s.guestLogin);
  const loginUser = useAuthStore((s) => s.loginUser);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.SubmitEvent) {
  e.preventDefault();

  if (!email.includes("@")) {
    setError("Invalid email");
    return;
  }

  try {
    // 1. Firebase Auth login
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    // 2. Load Firestore user document
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      setError("User not found in database");
      return;
    }

    // 3. Update Zustand store
    loginUser({
      email: user.email,
      uid: user.uid,
    });

    // 4. Close modal + redirect
    closeLogin();
    if (pathname === "/") {
      router.push("/for-you");
    }

  } catch (err: any) {
    switch (err.code) {
      case "auth/invalid-email":
        setError("Invalid email format");
        break;
      case "auth/user-not-found":
        setError("User not found");
        break;
      case "auth/wrong-password":
        setError("Incorrect password");
        break;
      default:
        setError("Something went wrong");
    }
  }
}

  function handleGuestLogin() {
    guestLogin();
    closeLogin();
    if (pathname === "/") {
    router.push("/for-you");
  }
  }

  return (
    <>
      <div className="auth__content">
        <div className="auth__title">Log in to Summarist</div>

        {error && <div className="auth__error">{error}</div>}

        {/* Guest Login */}
        <button className="btn guest__btn--wrapper" onClick={handleGuestLogin}>
          <figure className="google__icon--mask guest__icon--mask">
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
            >
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
          </figure>
          <div>Login as a Guest</div>
        </button>

        {/* Separator */}
        <div className="auth__separator">
          <span className="auth__separator--text">or</span>
        </div>

        {/* Google Login */}
        <button className="btn google__btn--wrapper">
          <figure className="google__icon--mask">
            <Image src={googleIcon} alt="google" width={40} height={40} priority />
          </figure>
          <div>Login with Google</div>
        </button>

        <div className="auth__separator">
          <span className="auth__separator--text">or</span>
        </div>

        {/* Form */}
        <form className="auth__main--form" onSubmit={handleLogin}>
          <input className="auth__main--input" type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className="auth__main--input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <LoginButton />
        </form>
      </div>

      <div className="auth__forgot--password" onClick={() => setAuthMode("forgot")}>
        Forgot your password?
      </div>

      <button className="auth__switch--btn" onClick={() => setAuthMode("register")}>
        Don't have an account?
      </button>

      {/* Close Button */}
      <div className="auth__close--btn" onClick={closeLogin}>
        <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" height="1em" width="1em">
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </>
  );
}
