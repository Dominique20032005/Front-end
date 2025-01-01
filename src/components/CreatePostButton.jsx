import React from "react";
import CreatePostForm from "./CreatePostForm";

const CreatePostButton = ({ onCreatePost, onOpenForm, onCloseForm }) => {
  return (
    <div className="mt-4 mb-4 ml-4">
      <button
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        onClick={onOpenForm}
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePostButton;
