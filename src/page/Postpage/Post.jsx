/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PostInfo from "../../components/PostInfo";
import CreatePostButton from "../../components/CreatePostButton";
import CreatePostForm from "../../components/CreatePostForm";
import AuthenticateOverlay from "../../components/AuthenticateOverlay";
import DeletePostModal from "../../components/DeletePostModal";
import SavePostPageLink from "../../components/SavePostPageLink";
import { useAuthStorage } from "../../hooks/useAuthStrorage";
import { useApiStorage } from "../../hooks/useApiStorage";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Post = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAuthenticateModalOpen, setIsAuthenticateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const { isLoggedIn, user } = useAuthStorage();
  const { createPost, getPostList, posts, deletePost, likePost, savePost } =
    useApiStorage();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await getPostList();
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, [getPostList]);

  const animationVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleCreatePost = async ({ content, files }) => {
    const postToast = toast.loading("Creating post...");

    try {
      await createPost({ content, files });
      await getPostList();

      toast.success("Post created successfully!", { id: postToast });
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.", {
        id: postToast,
      });
    }
  };

  const handleOpenForm = () => {
    if (isLoggedIn) {
      setIsFormVisible(true);
    } else {
      setIsAuthenticateModalOpen(true);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePost(postToDelete);
      await getPostList();

      setPostToDelete(null);
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleLikeClick = async (postId) => {
    try {
      await likePost(postId);
      await getPostList();
    } catch (error) {
      console.error("Failed to like/unlike post:", error);
    }
  };

  const handleSaveClick = async (postId) => {
    try {
      const currentPost = posts.find((post) => post.id === postId);

      await savePost(postId);
      await getPostList();

      if (!currentPost.savedByCurrentUser) {
        toast.success("Post has successfully been saved in your savePost section!");
      }
    } catch (error) {
      console.error("Failed to save/unsave post:", error);
      toast.error("Failed to save the post. Please try again.");
    }
  };
  
  

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col relative">
      {/* Overlay when the Create Post Form is visible */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-40 transition-opacity duration-500 ease-in-out"></div>
      )}

      {/* Main content */}
      <Header />

      <div className="flex items-center space-x-4 px-4 py-2">
        <CreatePostButton
          onCreatePost={handleCreatePost}
          onOpenForm={handleOpenForm}
          onCloseForm={handleCloseForm}
        />
        <SavePostPageLink />
      </div>

      <main className="flex-grow flex flex-col items-center justify-start p-4 space-y-4">
        <div className="w-[37%] mx-auto bg-[#23272A] rounded-lg shadow-lg p-8 relative">
          {posts && posts.length > 0 ? (
            [...posts].reverse().map((post, index) => {
              const isNewPost = index === 0;
              const isCurrentUser = user?.id === post.user.id;
              return (
                <motion.div
                  key={post.id}
                  className="post-item bg-[#1E2124] rounded-lg mb-6 p-6 shadow-sm"
                  initial="hidden"
                  animate="visible"
                  variants={animationVariants}
                  transition={{ duration: 0.5, delay: isNewPost ? 0 : 0.2 }}
                >
                  <PostInfo
                    isNewPost={isNewPost}
                    isCurrentUser={isCurrentUser}
                    setPostToDelete={setPostToDelete}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    post={post}
                    handleLikeClick={handleLikeClick}
                    handleSaveClick={handleSaveClick}
                  />
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-400">No posts found.</p>
          )}
        </div>

        {/* Delete Post Modal */}
        <DeletePostModal
          isOpen={isDeleteModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </main>

      <Footer />

      {/* Unauthorized Modal */}
      <AuthenticateOverlay
        isOpen={isAuthenticateModalOpen}
        onClose={() => setIsAuthenticateModalOpen(false)}
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