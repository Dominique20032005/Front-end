import React from "react";
import { toast } from "react-hot-toast";

const DeletePostModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    const deleteToast = toast.loading("Deleting post...");

    try {
      await onConfirm(); // Call the onConfirm handler passed as a prop
      toast.success("Post deleted successfully!", { id: deleteToast }); // Reuse the toast ID
    } catch (error) {
      toast.error("Failed to delete post. Please try again.", {
        id: deleteToast,
      }); // Reuse the toast ID
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      {/* Modal container with pop-up animation */}
      <div className="bg-[#23272A] rounded-lg p-6 max-w-md w-full shadow-lg animate-pop-up">
        <h2 className="text-white text-lg font-bold mb-4">Delete Post</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-700 hover:bg-gray-800 text-gray-300 px-4 py-2 rounded-lg transition duration-200 ease-in-out"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
