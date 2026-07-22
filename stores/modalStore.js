// stores/modalStore.js
import { create } from "zustand";

export const useModalStore = create((set) => ({
  authMode: "login",
  isLoginOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
  setAuthMode: () =>set({ authMode})
}));
