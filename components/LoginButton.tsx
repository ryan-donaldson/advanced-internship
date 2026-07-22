"use client";

import { useModalStore } from "../stores/modalStore";

export default function LoginButton({ classes = "btn" }) {
  const openLogin = useModalStore((state) => state.openLogin);

  return <button className={classes} onClick={openLogin}>Login</button>;
}
