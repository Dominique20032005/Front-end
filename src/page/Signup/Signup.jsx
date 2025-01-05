/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApiStorage } from "../../hooks/useApiStorage";
import { toast } from "react-hot-toast";
import { faker } from "@faker-js/faker";
import { FaRandom } from "react-icons/fa";
import Avatar from "../../components/Avatar";

export default function SignUpForm() {
  const { signUp } = useApiStorage();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [error, setError] = useState(null);
  const [randomClick, setRandomClick] = useState(null);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const avatarSeeds = useMemo(
    () =>
      Array(5)
        .fill(null)
        .map(() => faker.person.fullName()),
    [randomClick]
  );

  const handleRandomClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setRandomClick((prev) => !prev);
    }, 150); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signUp({ ...formData, avatar: avatarSeeds[selectedAvatarIndex] });

      const toastId = toast.success("Signup successful!", { duration: 500 });

      setTimeout(() => {
        toast.dismiss(toastId);
        navigate("/login");
      }, 500);
    } catch (err) {
      toast.error("Signup failed. Please try again.", { duration: 500 });
      setError("An error occurred during signup. Please try again.");
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
    <div
      className="min-h-screen flex items-center justify-center bg-[#1a1d21]"
      style={{ paddingTop: "20px", paddingBottom: "20px" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-[#2a2d31] text-white rounded-md shadow-lg border border-teal-400"
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">SignUp</h1>

        {/* Username Field */}
        <div className="mb-6">
          <label className="block text-white mb-2">
            User name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#1e2126] text-white border border-gray-600 focus:border-teal-400 focus:outline-none"
            placeholder="User name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-white mb-2">
            Email <span className="text-red-500">*</span>
          </label>
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
        <div className="mb-6">
          <label className="block text-white mb-2">
            Password <span className="text-red-500">*</span>
          </label>
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

        {/* Avatar Field */}
        <div className="mb-8">
          <label className="block text-white mb-2">
            Avatar <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Select the avatar below!"
            value={avatarSeeds[selectedAvatarIndex] || ""}
            disabled
            className="w-full p-3 rounded-md bg-[#1e2126] text-white border border-gray-600 focus:border-teal-400 cursor-not-allowed"
          />

          <button
            type="button"
            className={`mt-5 p-2 bg-teal-500 text-white rounded-lg flex items-center justify-center gap-2 transition-transform duration-150 ${
              isAnimating ? "scale-90" : ""
            }`}
            onClick={handleRandomClick}
          >
            <FaRandom /> Random
          </button>

          <div className="mt-5 flex gap-3 justify-center">
            {avatarSeeds.map((avatar, index) => (
              <Avatar
                key={index}
                name={avatar}
                selected={index === selectedAvatarIndex}
                onClick={() => setSelectedAvatarIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 rounded-md border border-teal-400 text-white hover:bg-teal-400/10 transition-colors"
        >
          Submit!
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}
