import { create } from "zustand";
import { useAuthStorage } from "./useAuthStrorage";

const API_BASE_URL =
  import.meta.env.VITE_BASE_API || "http://localhost:8080/api/v1";

export const useApiStorage = create((set, get) => ({
  error: null, // Error state
  posts: [],

  logIn: async (formData) => {
    try {
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
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      useAuthStorage.getState().setLogin(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  },

  signUp: async (formData) => {
    try {
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
    } catch (err) {
      set({
        error: "An error occurred while creating the post. Please try again.",
      });
      console.error("Create post error:", err);

      throw err;
    }
  },

    getPostList: async ({ query } = {}) => {
      try {
        const queryString = new URLSearchParams(query).toString();
        const response = await fetch(`${API_BASE_URL}/posts?${queryString}`, {
          credentials: "include",
        });

      if (!response.ok) {
        throw new Error("Failed to get the info of the Post");
      }

      const data = await response.json();

      set({ error: null, posts: data });

      return data;
    } catch (err) {
      set({
        error:
          "An error occurred while getting info the post. Please try again.",
      });
      console.error("Getting info post error:", err);

      throw err;
    }
  },

  deletePost: async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }
    } catch (err) {
      console.error("Delete post error:", err);
      throw new Error("Network error occurred while deleting the post.");
    }
  },

  likePost: async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to like/unlike post");
      }
    } catch (err) {
      set({
        error: "An error occurred while liking/unliking the post.",
      });
      console.error("Like post error:", err);
      throw err;
    }
  },

  getLikesCount: async (postId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/posts/${postId}/likes-count`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch likes count");
      }

      const data = await response.json();

      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? { ...post, likesCount: data.likesCount } : post
        ),
      }));

      return data;
    } catch (err) {
      console.error("Failed to fetch likes count:", err);
      throw err;
    }
  },

  savePost: async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/save`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to save/unsave post");
      }

      const data = await response.json(); // Includes { isSaved }
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, isSaved: data.isSaved, saveCount: data.saveCount }
            : post
        ),
      }));

      return data;
    } catch (err) {
      set({
        error: "An error occurred while saving/unsaving the post.",
      });
      console.error("Save post error:", err);
      throw err;
    }
  },

  getSaveCount: async (postId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/posts/${postId}/save-count`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch save count");
      }

      const data = await response.json();

      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? { ...post, saveCount: data.saveCount } : post
        ),
      }));

      return data;
    } catch (err) {
      console.error("Failed to fetch save count:", err);
      throw err;
    }
  },

  downloadFile: async (postId, fileId, fileName) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/posts/${postId}/files/${fileId}/download`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Download file error:", err);
      throw new Error("An error occurred while downloading the file.");
    }
  },
}));
