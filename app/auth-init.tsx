"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function AuthInit() {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    // Restore guest user ONLY in the browser
    const guest = localStorage.getItem("guestUser");
    if (guest) {
      setUser(JSON.parse(guest));
    }
  }, []);

  return null;
}
