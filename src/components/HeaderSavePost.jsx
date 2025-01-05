/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStorage } from "../hooks/useAuthStrorage";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";

const HeaderSavePost = () => {
  const { isLoggedIn, user } = useAuthStorage();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (isLoggedIn && user) {
      const userAvatar = createAvatar(botttsNeutral, {
        seed: user.avatar,
      }).toDataUri();
      setAvatar(userAvatar);
    } else {
      setAvatar(null);
    }
  }, [isLoggedIn, user]);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-gray-200 shadow-md relative">
      {/* Logo */}
      <div className="text-2xl font-bold text-teal-400">
        <h1>LEARNING-SOCIAL</h1>
      </div>

      {/* Welcome Message */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-300 tracking-wide">
        Welcome! You have saved posts here.
      </div>

      {/* Avatar and Redirect Link */}
      <div className="flex items-center space-x-6 ml-auto">
        {/* Redirect Link */}
        <Link
          to="/post"
          className="relative flex items-center gap-2 px-4 py-2 text-gray-200 font-bold transition duration-300 ease-in-out group hover:text-teal-400"
        >
          {/* Back Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 font-bold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l-7 7 7 7" />
          </svg>
          Back to Posts
          {/* Animated underline */}
          <span
            className="absolute left-0 bottom-0 h-1 bg-teal-400 transition-all duration-300 ease-in-out group-hover:w-full w-0"
          ></span>
        </Link>

        {/* Avatar */}
        {isLoggedIn && avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center">
            <span className="text-gray-900 font-bold">?</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderSavePost;
