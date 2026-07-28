"use client";

import LoginModal from "@/components/LoginModal";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <LoginModal />
    </>
  );
}
