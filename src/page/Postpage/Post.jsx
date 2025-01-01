import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PostInfo from "../../components/PostInfo";
import CreatePostButton from "../../components/CreatePostButton";
import CreatePostForm from "../../components/CreatePostForm";
import AuthenticateOverlay from "../../components/AuthenticateOverlay";
import { useAuthStorage } from "../../hooks/useAuthStrorage";
import { useApiStorage } from "../../hooks/useApiStorage";
import { toast } from "react-hot-toast";

const Post = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useAuthStorage((state) => state.isLoggedIn);
  const { createPost, getPostList } = useApiStorage();

  const handleCreatePost = async ({ content, files }) => {
    const postToast = toast.loading("Creating post...");

    try {
      await createPost({ content, files });
      await getPostList();

      toast.success("Post created successfully!", { id: postToast });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.", { id: postToast });
    }
  };

  const handleOpenForm = () => {
    if (isLoggedIn) {
      setIsFormVisible(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col relative">
      {/* Overlay when the Create Post Form is visible */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-40 transition-opacity duration-500 ease-in-out"></div>
      )}

      {/* Main content */}
      <Header />
      <CreatePostButton
        onCreatePost={handleCreatePost}
        onOpenForm={handleOpenForm}
        onCloseForm={handleCloseForm}
      />
      <main className="flex-grow flex flex-col items-center justify-start p-4 space-y-4">
        <PostInfo />
      </main>
      <Footer />

      {/* Unauthorized Modal */}
      <AuthenticateOverlay
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Smooth Form */}
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in">
          <CreatePostForm
            onClose={handleCloseForm}
            onSubmit={handleCreatePost}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
