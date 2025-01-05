// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStorage } from "../hooks/useAuthStrorage";
import AuthenticateOverlay from "../components/AuthenticateOverlay";

const SavedPostPageLink = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuthStorage();
  const [isAuthenticateModalOpen, setIsAuthenticateModalOpen] = useState(false);

  const handleLinkClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation
      setIsAuthenticateModalOpen(true);
    }
  };

  return (
    <>
      <Link
        to="/savePost"
        onClick={handleLinkClick}
        className={`relative flex items-center gap-2 px-4 py-2 text-gray-200 transition duration-300 ease-in-out group ${
          location.pathname === "/savePost" ? "text-teal-400 font-bold" : "hover:text-teal-400"
        }`}
      >
        {/* Bookmark Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        Saved Posts
        {/* Animated underline */}
        <span
          className={`absolute left-0 bottom-0 h-1 bg-teal-400 transition-all duration-300 ease-in-out ${
            location.pathname === "/savePost" ? "w-full" : "w-0 group-hover:w-full"
          }`}
        ></span>
      </Link>

      {/* Unauthorized Modal */}
      <AuthenticateOverlay
        isOpen={isAuthenticateModalOpen}
        onClose={() => setIsAuthenticateModalOpen(false)}
      />
    </>
  );
};

export default SavedPostPageLink;
