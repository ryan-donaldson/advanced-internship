"use client";

import LoginModal from "@/components/LoginModal";
import AuthProvider from "@/providers/AuthProvider";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <LoginModal />
    </AuthProvider>
  );
}
