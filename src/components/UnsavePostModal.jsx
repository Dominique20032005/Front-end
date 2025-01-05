import React from "react";
import { toast } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const UnsavePostModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    const unsaveToast = toast.loading("Unsaving post...");

    try {
      await onConfirm(); 
      toast.success("Post unsaved successfully!", { id: unsaveToast }); 
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to unsave post. Please try again.", {
        id: unsaveToast,
      }); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      {/* Modal container with pop-up animation */}
      <div className="bg-[#23272A] rounded-lg p-6 max-w-md w-full shadow-lg animate-pop-up">
        <h2 className="text-white text-lg font-bold mb-4">Unsave Post</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to unsave this post? You can save it again later.
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-700 hover:bg-gray-800 text-gray-300 px-4 py-2 rounded-lg transition duration-200 ease-in-out"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsavePostModal;
