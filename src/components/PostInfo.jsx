import { useEffect, useState } from "react";
import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { format } from "date-fns";
import {
  Download,
  MessageCircle,
  Bookmark,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { useAuthStorage } from "../hooks/useAuthStrorage";
import { useApiStorage } from "../hooks/useApiStorage";
import DeletePostModal from "./DeletePostModal";


export default function PostInfo({ isNewPost, isCurrentUser, setPostToDelete, setIsDeleteModalOpen, post }) {
  const [showChatBox, setShowChatBox] = useState(() => {
    const savedState = localStorage.getItem("showChatBoxState");
    return savedState ? JSON.parse(savedState) : {};
  });
  const [newComments, setNewComments] = useState(() => {
    const savedComments = localStorage.getItem("newCommentsState");
    return savedComments ? JSON.parse(savedComments) : {};
  });

  const { user, isLoggedIn } = useAuthStorage();

  const { getPostList, deletePost, likePost, savePost, downloadFile, posts } =
    useApiStorage();

  useEffect(() => {
    localStorage.setItem("showChatBoxState", JSON.stringify(showChatBox));
  }, [showChatBox]);

  useEffect(() => {
    localStorage.setItem("newCommentsState", JSON.stringify(newComments));
  }, [newComments]);

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
      await savePost(postId);
      await getPostList();
    } catch (error) {
      console.error("Failed to save/unsave post:", error);
    }
  };

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setIsDeleteModalOpen(true);
  };

  const handleToggleChatBox = (postId) => {
    setShowChatBox((prev) => {
      const updatedState = {
        ...prev,
        [postId]: !prev[postId],
      };
      localStorage.setItem("showChatBoxState", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  const handleAddComment = (postId) => {
    if (newComments[postId]?.trim() !== "") {
      console.log(`New comment for post ${postId}:`, newComments[postId]);
      setNewComments((prev) => {
        const updatedComments = { ...prev, [postId]: "" };
        localStorage.setItem(
          "newCommentsState",
          JSON.stringify(updatedComments)
        );
        return updatedComments;
      });
    }
  };

  const handleDownloadFile = async (postId, file) => {
    try {
      await downloadFile(postId, file.id, file.fileName);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  const generateAvatar = (name) => {
    return createAvatar(botttsNeutral, {
      seed: name,
    }).toDataUri();
  };

  return (
     <>
      {/* Post Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src={generateAvatar(post.user.avatar)}
            alt="User Avatar"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-white text-lg">
              {post.user.userName}
            </h2>
            <p className="text-sm text-gray-400">
              {format(new Date(post.createdAt), "dd/MM/yyyy")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isCurrentUser && (
            <button
              className="p-2 text-gray-400 hover:bg-gray-800 hover:text-red-500 rounded-full transition-colors"
              onClick={() => handleDeleteClick(post.id)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          {isLoggedIn && (
            <button
              className="p-2 text-gray-400 hover:bg-gray-800 hover:text-green-500 rounded-full transition-colors"
              onClick={() =>
                post.files.forEach((file) => handleDownloadFile(post.id, file))
              }
            >
              <Download className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      {/* Post Content */}
      <div className="mt-4">
        <p className="text-white text-sm leading-relaxed whitespace-pre-line bg-[#2A2E33] p-4 rounded-lg">
          {post.content}
        </p>
      </div>
      {/* Uploaded Files Section */}
      <div className="mt-4 border-t border-gray-800 pt-4">
        <h3 className="text-gray-400 font-semibold mb-2">Uploaded Files:</h3>
        <div className="space-y-2">
          {post.files && post.files.length > 0 ? (
            post.files.map((file, index) => (
              <a
                key={index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline"
              >
                {file.fileName}
              </a>
            ))
          ) : (
            <p className="text-gray-500">No files uploaded.</p>
          )}
        </div>
        {/* Likes and Saves Count */}
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm text-gray-400">{post.totalLikes} Likes</span>
          <span className="text-sm text-gray-400">{post.totalSaves} Saves</span>
        </div>
      </div>
      {/* Engagement Stats */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            post.likedByCurrentUser ? "text-teal-400" : "text-gray-300"
          }`}
          onClick={() => handleLikeClick(post.id)}
        >
          <ThumbsUp
            className={`w-5 h-5 ${
              post.likedByCurrentUser ? "fill-current text-teal-400" : ""
            }`}
          />
          <span>Like</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800/50 rounded-lg transition-colors text-gray-300"
          onClick={() => handleToggleChatBox(post.id)}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Comments</span>
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            post.savedByCurrentUser ? "text-teal-400" : "text-gray-300"
          }`}
          onClick={() => handleSaveClick(post.id)}
        >
          <Bookmark
            className={`w-5 h-5 ${
              post.savedByCurrentUser ? "fill-current text-teal-400" : ""
            }`}
          />
          <span>Save</span>
        </button>
      </div>

      {/* Comments Section */}
      {showChatBox[post.id] && (
        <div className="mt-4 border-t border-gray-800 pt-4">
          <h3 className="text-gray-400 font-semibold mb-2">Comments:</h3>
          <div className="space-y-2">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <p key={index} className="text-gray-300">
                  {comment}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 bg-[#2A2E33] text-gray-300 rounded-lg p-2 border border-gray-600 focus:outline-none"
              placeholder="Write a comment..."
              value={newComments[post.id] || ""}
              onChange={(e) =>
                setNewComments((prev) => ({
                  ...prev,
                  [post.id]: e.target.value,
                }))
              }
            />
            <button
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              onClick={() => handleAddComment(post.id)}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </>
  );

  // {
  //   /* Delete Post Modal */}
  // <DeletePostModal
  //   isOpen={isModalOpen}
  //   onConfirm={handleConfirmDelete}
  //   onCancel={handleCancelDelete}
  // />
}
