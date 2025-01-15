import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStorage } from "../../hooks/useAuthStrorage";
import { useApiStorage } from "../../hooks/useApiStorage";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";

const Header = () => {
  const { isLoggedIn, setLogin, user } = useAuthStorage(); 
  const { logOut, getPostList } = useApiStorage();
  const location = useLocation();
  const [showAuthButtons, setShowAuthButtons] = useState(true);
  const [avatar, setAvatar] = useState(null); 

  const TOAST_DURATION = 500; 

  useEffect(() => {
    if (isLoggedIn && user) {
      // const avatarSeed = user.avatar || "default-seed"; 
      // const url = `https://api.dicebear.com/9.x/${encodeURIComponent(avatarSeed)}/svg`;
      const avatar = createAvatar(botttsNeutral, {
          seed: user.avatar,
        }).toDataUri();

      setAvatar(avatar);
    } else {
      setAvatar(null);
    }
  }, [isLoggedIn, user]);

  const handleLogout = async () => {
    try {
      const toastId = toast.loading("Logging out...");

      await logOut();
      await getPostList();

      toast.success("Logout successful!", {
        id: toastId,
        duration: TOAST_DURATION,
      });


      setShowAuthButtons(false);
      setTimeout(() => {
        setLogin(false); 
        setShowAuthButtons(true); 
      }, TOAST_DURATION);
    } catch (err) {

      toast.error("Logout failed. Please try again.", {
        duration: TOAST_DURATION,
      });
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-gray-200 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-teal-400">
        <h1>LEARNING-SOCIAL</h1>
      </div>

      {/* Navigation Links - Centered */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
        <Link
          className={`relative px-4 py-2 oswald-bold text-gray-200 transition duration-300 ease-in-out group ${
            location.pathname === "/" ? "text-teal-400 font-bold" : "hover:text-teal-400"
          }`}
          to="/"
        >
          Home
          <span
            className={`absolute left-0 bottom-0 h-1 bg-teal-400 transition-all duration-300 ease-in-out ${
              location.pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          className={`relative px-4 py-2 oswald-bold text-gray-200 transition duration-300 ease-in-out group ${
            location.pathname === "/about" ? "text-teal-400 font-bold" : "hover:text-teal-400"
          }`}
          to="/about"
        >
          About
          <span
            className={`absolute left-0 bottom-0 h-1 bg-teal-400 transition-all duration-300 ease-in-out ${
              location.pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
        <Link
          className={`relative px-4 py-2 oswald-bold text-gray-200 transition duration-300 ease-in-out group ${
            location.pathname === "/post" ? "text-teal-400 font-bold" : "hover:text-teal-400"
          }`}
          to="/post"
        >
          Post
          <span
            className={`absolute left-0 bottom-0 h-1 bg-teal-400 transition-all duration-300 ease-in-out ${
              location.pathname === "/post" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </Link>
      </nav>

      {/* Authentication Buttons and Avatar */}
      <div className="flex items-center space-x-4 ml-auto">
        {isLoggedIn && showAuthButtons ? (
          <button
            className="px-6 py-2 text-gray-200 bg-teal-500 rounded-lg hover:bg-teal-600 active:scale-95 transition-all duration-200 ease-in-out"
            onClick={handleLogout}
          >
            Log out
          </button>
        ) : (
          showAuthButtons && (
            <>
              <Link
                className="px-6 py-2 text-gray-200 bg-teal-500 rounded-lg hover:bg-teal-600 active:scale-95 transition-all duration-200 ease-in-out"
                to="/login"
              >
                Log in
              </Link>
              <Link
                className="px-6 py-2 text-gray-200 bg-teal-500 rounded-lg hover:bg-teal-600 active:scale-95 transition-all duration-200 ease-in-out"
                to="/signup"
              >
                Sign up
              </Link>
            </>
          )
        )}
        {/* Avatar Icon (Conditional based on login) */}
        <div>
          {isLoggedIn && avatar ? (
            <img
              src={avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-teal-400 cursor-pointer" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
