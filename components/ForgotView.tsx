"use client";

import { useState } from "react";

type LoginViewProps = {
  setAuthMode: (mode: "login" | "register" | "forgot") => void;
  closeLogin: () => void;
};

export default function ForgotView({ setAuthMode, closeLogin }: LoginViewProps) {
  const [error, setError] = useState("");

  async function handleReset(e: React.SubmitEvent) {
    e.preventDefault();
    setError("This feature has not been implemented yet")

  }

  return (
    <>
      <div className="auth__content">
        <div className="auth__title">Reset your password</div>
        <form className="auth__main--form" onSubmit={handleReset}>
          <input
            className="auth__main--input"
            type="text"
            placeholder="Email address"
          />
          {error && <div className="auth__error">{error}</div>}
          <button className="btn">
            <span>Send reset password link</span>
          </button>
        </form>
      </div>
      <button
        className="auth__switch--btn"
        onClick={() => setAuthMode("login")}
      >
        Go to login
      </button>
    </>
  );
}
