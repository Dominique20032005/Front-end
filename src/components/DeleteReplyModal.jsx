import React from "react";

const DeleteReplyModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg modal-animate-slide-in">
        <p className="mb-4">Are you sure you want to delete this reply?</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReplyModal;
