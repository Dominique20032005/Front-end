import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStorage } from "./useAuthStrorage";

const API_BASE_URL = import.meta.env.VITE_BASE_API || "http://localhost:8080/api/v1";

export const useApiStorage = create(
  persist(
    (set) => ({
      error: null, // Error state

      logIn: async (formData) => {
        try {
          console.log("API Base URL:", API_BASE_URL);
          const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include", 
          });

          if (!response.ok) {
            throw new Error("Login failed");
          }

          const data = await response.json();
          console.log("Login successfully:", data);

          const authStorage = useAuthStorage.getState();
          authStorage.setLogin(true, data);
          
          set({ error: null }); 
        } catch (err) {
          set({
            error: "An error occurred during login. Please try again.",
          });
          console.error("Login error:", err);
        }
      },

      logOut: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            redirect: "follow",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Logout failed");
          }

          const result = await response.text();
          console.log("Logout successful:", result);

          useAuthStorage.getState().setLogin(false);
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },

      signUp: async (formData) => {
        try {
          console.log("API Base URL:", API_BASE_URL);
          const response = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), 
          });

          if (!response.ok) {
            throw new Error("Signup failed");
          }

          const data = await response.json();
          console.log("Signup successful:", data);

          set({ error: null });

          return data; 
        } catch (err) {
          set({
            error: "An error occurred during signup. Please try again.",
          });
          console.error("Signup error:", err);

          throw err; 
        }
      },

      createPost: async ({ content, files }) => {
        console.log(content);
        console.log(files);
        try {
          const formData = new FormData();
          formData.append("content", content);
          if (files && files.length > 0) {
            files.forEach((file) => {
              formData.append("files", file);
            });
          }

          const response = await fetch(`${API_BASE_URL}/posts`, {
            method: "POST",
            body: formData,
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Failed to create post");
          }

          const data = await response.json();
          console.log("Post created successfully:", data);

          set({ error: null }); 

          return data;
        } catch (err) {
          set({
            error: "An error occurred while creating the post. Please try again.",
          });
          console.error("Create post error:", err);

          throw err;
        }
      },
    }),
    {
      name: "api-storage", 
    }
  )
);
