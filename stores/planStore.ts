import { create } from "zustand";

type PlanState = {
  plan: "monthly" | "yearly" | null;
  setPlan: (p: "monthly" | "yearly") => void;
};

export const usePlanStore = create<PlanState>((set) => ({
  plan: null,
  setPlan: (p) => set({ plan: p }),
}));
