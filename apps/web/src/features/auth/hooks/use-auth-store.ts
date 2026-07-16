import { create } from "zustand";

interface AuthState {
  step: "start" | "verify-email";
  setStep: (step: "start" | "verify-email") => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  step: "start",
  setStep: (step) => set({ step }),
}));
