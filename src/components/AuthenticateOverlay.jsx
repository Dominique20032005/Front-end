/* eslint-disable no-unused-vars */
import React from 'react';

const AuthenticateOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Smooth Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-500 ease-in-out animate-fade-in"
        onClick={handleBackdropClick}
      ></div>

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 animate-pop-up"
        onClick={handleBackdropClick}
      >
        <div
          className="bg-[#2D2F33] text-gray-200 rounded-lg shadow-lg max-w-md w-full p-6"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b border-gray-600 pb-3">
            <h3 id="modal-title" className="text-xl font-bold text-gray-100">
              Unauthorized
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <div id="modal-description" className="mt-4">
            <p className="text-sm text-gray-400">
              You need to log in to use this feature. Please log in to continue.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticateOverlay;
