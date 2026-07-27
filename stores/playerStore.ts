import { create } from "zustand";

type PlayerState = {
  fontSize: "small" | "medium" | "large" | "xlarge";
  setFontSize: (size: PlayerState["fontSize"]) => void;
  bookDurations: Record<string, number>;
  setBookDuration: (id: string, duration: number) => void;
  resetDurations: () => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  fontSize: "small",

  setFontSize: (size) => set({ fontSize: size }),

  resetDurations: () =>
  set(() => ({
    bookDurations: {}
  })),

  bookDurations: {},
  setBookDuration: (id, duration) =>
    set((state) => ({
      bookDurations: {
        ...state.bookDurations,
        [id]: duration,
      },
    })),
}));

