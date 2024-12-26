import React, { useState } from 'react';

const CreatePostForm = ({ onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() || files.length > 0) {
      onSubmit({ content, files });
      setContent('');
      setFiles([]);
      onClose();
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); 
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md transform transition-transform duration-300 ease-out scale-100">
      <h2 className="text-2xl font-bold mb-4 text-white">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
          rows={4}
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="mb-4">
          <label className="block text-white mb-2">Attach files:</label>
          <div className="relative">
            <label
              htmlFor="fileInput"
              className="inline-block bg-teal-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-teal-600 transition-all duration-300"
            >
              Choose Files
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <div className="mt-2 text-gray-300">
              {files.length > 0 ? (
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              ) : (
                <span>No files chosen</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
