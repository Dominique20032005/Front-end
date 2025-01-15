import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import the Toaster
import Main from "./page/Main/Main";
import About from "./page/Aboutpage/About";
import Post from "./page/Postpage/Post";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import SavePost from "./page/SavePostpage/SavePost";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css";

const App = () => {
  return (
    <BrowserRouter className="min-h-screen">
      {/* Add the Toaster component */}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/post" element={<Post />} />
        <Route path="/savePost" element={<SavePost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
