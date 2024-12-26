import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStorage = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      setLogin: (status, userData = null) => set({ isLoggedIn: status, user: userData }),
      logOut: () => set({ isLoggedIn: false, user: null }), 
    }),
    {
      name: "auth-storage",
    }
  )
);
