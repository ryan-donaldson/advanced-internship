"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/stores/playerStore";
import { Book } from "@/types/book";

type Props = {
  book: Book
}

export default function AudioDuration({ book }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const saveDuration = () => {
      if (Number.isFinite(audio.duration)) {
        usePlayerStore
        .getState()
        .setBookDuration(book.id, audio.duration);
      }
    };

    audio.addEventListener("loadedmetadata", saveDuration);

    if (audio.readyState >= 1) {
      saveDuration();
    }

    const onLoaded = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      const duration = target.duration;

      // Store duration for THIS book
      usePlayerStore.getState().setBookDuration(book.id, duration);
    };

    audio.addEventListener("loadedmetadata", onLoaded);

    return () => {
      audio.removeEventListener("loadedmetadata", saveDuration);
    };
  }, [book.id, book.audioLink]);

  return (
    <audio
      ref={audioRef}
      src={book.audioLink}
      preload="metadata"
      style={{ display: "none" }}
    />
  );
}
