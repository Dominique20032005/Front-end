import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4 px-6 flex flex-col md:flex-row justify-between items-start md:items-center shadow-md space-y-4 md:space-y-0 text-sm">
      {/* Logo and Description */}
      <div className="flex flex-col space-y-1 max-w-md">
        <div className="flex items-center space-x-2">
          <h1 className="text-base font-bold">Learning Social</h1>
        </div>
        <p className="text-sm text-gray-400"> 
          Created and designed on Dec 7th 2024, UIT-Learning is the place where you can share and explore. We hope that UIT-Learning can help you with your education process, meet new people, learning new things that you wanted.
        </p>
      </div>

      {/* Quick Links */}
      <div className="space-y-1">
        <h2 className="text-base font-bold">Quick Links</h2>
        <nav className="flex flex-col space-y-1">
          <Link
            to="/"
            className="hover:text-teal-400 transition duration-300 text-sm" // Increased font size
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-teal-400 transition duration-300 text-sm" // Increased font size
          >
            About
          </Link>
          <Link
            to="/post"
            className="hover:text-teal-400 transition duration-300 text-sm" // Increased font size
          >
            Post
          </Link>
        </nav>
      </div>

      {/* Contact Info */}
      <div className="space-y-1">
        <h2 className="text-base font-bold">Contact</h2>
        <p className="text-sm text-gray-400">
          <a
            href="https://fb.com/bhtcnpm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400 transition duration-300"
          >
            fb.com/bhtcnpm
          </a>
        </p>
        <p className="text-sm text-gray-400"> 
          <a
            href="mailto:admin@bhtcnpm.com"
            className="hover:text-teal-400 transition duration-300"
          >
            admin@bhtcnpm.com
          </a>
        </p>
      </div>

      {/* GitHub Icon */}
      <div className="text-3xl mr-10"> 
        <a
          href="https://github.com/orgs/Software-project-sem4/repositories" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-teal-400 transition duration-300"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
