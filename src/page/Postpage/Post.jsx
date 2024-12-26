import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PostInfo from '../../components/PostInfo';
import CreatePostButton from '../../components/CreatePostButton';
import CreatePostForm from '../../components/CreatePostForm'; 
import AuthenticateOverlay from '../../components/AuthenticateOverlay';
import { useAuthStorage } from '../../hooks/useAuthStrorage';
import { useApiStorage } from '../../hooks/useApiStorage'; 

const Post = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Sample Post Title',
      author: 'Author Name',
      time: 'Just now',
    },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const isLoggedIn = useAuthStorage((state) => state.isLoggedIn); 
  const { createPost } = useApiStorage(); 

  const handleCreatePost = async ({ content, files }) => {
    try {
      const newPost = await createPost({ content, files });

      setPosts([{ ...newPost, time: 'Just now' }, ...posts]);
      setIsFormVisible(false); 
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
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
    <div className="bg-[#1A1D1F] text-gray-300 min-h-screen flex flex-col relative">
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
        {posts.map((post) => (
          <PostInfo
            key={post.id}
            title={post.title}
            author={post.author}
            time={post.time}
          />
        ))}
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
