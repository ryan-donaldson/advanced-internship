"use client";

import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";

export default function LogoutButton() {
  const user = useAuthStore((s) => s.user);
  const openLogin = useModalStore((s) => s.openLogin);
  const isLoggedIn = !!user;
  const logoutUser = useAuthStore((s) => s.logoutUser);

  function handleLogout() {
    logoutUser();
  }

  return (
    <>
      {!isLoggedIn ? (
        <div onClick={openLogin}>
          Login
        </div>
      ) : (
        <div>
          <button
            className="sidebar__logout"
            style={{ color: "#032b41", fontSize: "16px" }}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
    </>
  );
}
