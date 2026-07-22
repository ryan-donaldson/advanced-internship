"use client";

import { useModalStore } from "../stores/modalStore";

export default function Navbar() {
  const openLogin = useModalStore((state) => state.openLogin);
  return (
    <div>
      <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <img className="nav__img" src="/logo.png" alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li onClick={openLogin} className="nav__list nav__list--login">Login</li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
    </div>
  );
}