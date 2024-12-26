"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiStorage } from "../../hooks/useApiStorage";
import { toast } from "react-hot-toast"; 

export default function LoginForm() {
  const { logIn } = useApiStorage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginToast = toast.loading("Logging in..."); 
    await logIn(formData);

    const currentError = useApiStorage.getState().error;

    if (!currentError) {
      toast.success("Login successful!", { id: loginToast }); 
      setTimeout(() => navigate("/"), 500); 
    } else {
      toast.error("Login failed. Please try again.", { id: loginToast }); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1d21]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-[#2a2d31] text-white rounded-md shadow-lg border border-teal-400"
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          LogIn
        </h1>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-white mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#1e2126] text-white border border-gray-600 focus:border-teal-400 focus:outline-none"
            placeholder="Email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-8">
          <label className="block text-white mb-2">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#1e2126] text-white border border-gray-600 focus:border-teal-400 focus:outline-none"
            placeholder="Password"
            required
          />
        </div>

        {/* Error Display */}
        {useApiStorage.getState().error && (
          <p className="mb-4 text-red-500 text-center">
            {useApiStorage.getState().error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 rounded-md border border-teal-400 text-white hover:bg-teal-400/10 transition-colors"
        >
          LogIn
        </button>

        {/* Signup Link */}
        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-teal-400 hover:underline"
          >
            Sign up here
          </button>
        </p>
      </form>
    </div>
  );
}
