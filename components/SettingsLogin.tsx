import Image from "next/image";
import Loginpng from "@/public/login.png";
import LoginButton from "./LoginButton";

type Props = {
  page: string
}

export default function SettingsLogin({ page }: Props) {
  return (
    <>
      <div className="settings__login--wrapper">
        <Image
          alt="login"
          src={Loginpng}
          width="1033"
          height="712"
          decoding="async"
          data-nimg="1"
          loading="lazy"
          style={{ color: "transparent" }}
        />
        <div className="settings__login--text">
          {page === "player" ? (
            "Log in to your account to read and listen to the book"
          ) :
            "Log in to your account to see your details."
          }
          
        </div>
        <div className="btn settings__login--btn">
          <LoginButton />
        </div>
      </div>
    </>
  );
}
