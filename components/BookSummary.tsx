"use client";

import { usePlayerStore } from "@/stores/playerStore";
import { Book } from "@/types/book";
import { useAuthStore } from "@/stores/authStore";
import SettingsLogin from "./SettingsLogin";
import { useState } from "react";

type Props = {
  data: Book;
};

export default function PlayerSummary({ data }: Props) {
  const fontSize = usePlayerStore((s) => s.fontSize);
  const user = useAuthStore((s) => s.user);
  const [showContent, setShowContent] = useState(false);

  setTimeout(() => setShowContent(true), 300);

  const px =
    fontSize === "small"
      ? "16px"
      : fontSize === "medium"
        ? "18px"
        : fontSize === "large"
          ? "22px"
          : "26px";

  return (
    <>
      {showContent ? (
        <div className="summary">
          <div className="audio__book--summary" style={{ fontSize: px }}>
            <div className="audio__book--summary-title">
              <b>{data.title}</b>
            </div>
            {data.subscriptionRequired === true ? (
              <SettingsLogin page={"player"} />
            ) : (
              <>
                <div className="audio__book--summary-text">{data.summary}</div>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="spinner__icon--wrapper">
            <div className="spinner"></div>
          </div>
        </>
      )}
    </>
  );
}
