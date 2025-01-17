/* eslint-disable react/prop-types */
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
import CommentBox from "./CommentBox";

export default function PostInfo({
  isCurrentUser,
  setPostToDelete,
  setIsDeleteModalOpen,
  post,
  ShouldRenderDeleteBtn = true,
  handleLikeClick,
  handleSaveClick,
}) {
  const [showChatBox, setShowChatBox] = useState(() => {
    const savedState = localStorage.getItem("showChatBoxState");
    return savedState ? JSON.parse(savedState) : {};
  });
  const [newComments, setNewComments] = useState(() => {
    const savedComments = localStorage.getItem("newCommentsState");
    return savedComments ? JSON.parse(savedComments) : {};
  });

  const { user, isLoggedIn } = useAuthStorage();
  const { fetchComments, downloadFile } = useApiStorage();

  useEffect(() => {
    localStorage.setItem("showChatBoxState", JSON.stringify(showChatBox));
  }, [showChatBox]);

  useEffect(() => {
    localStorage.setItem("newCommentsState", JSON.stringify(newComments));
  }, [newComments]);

  // Fetch and calculate total comments
  useEffect(() => {
    const loadComments = async () => {
      try {
        await fetchComments(post.id);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    loadComments();
  }, [post.id, fetchComments]);

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
          {isCurrentUser && ShouldRenderDeleteBtn && (
            <button
              className="p-2 text-gray-400 hover:bg-gray-800 hover:text-red-500 rounded-full transition-colors"
              onClick={() => handleDeleteClick(post.id)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          {isLoggedIn && (
            <div className="relative group">
              <button
                className="p-2 text-gray-400 hover:bg-gray-800 hover:text-green-500 rounded-full transition-colors"
                onClick={() =>
                  post.files.forEach((file) =>
                    handleDownloadFile(post.id, file)
                  )
                }
              >
                <Download className="w-5 h-5" />
              </button>
              <div className="absolute top-1/2 left-full ml-3 -translate-y-1/2 px-3 py-2 bg-[#2D3748] text-gray-300 text-sm rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-350 ease-in-out whitespace-nowrap z-10">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-[#2D3748]"></div>
                Download all files
              </div>
            </div>
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
              <button
                key={index}
                onClick={() => handleDownloadFile(post.id, file)}
                className="block text-teal-400 hover:underline text-left"
              >
                {file.fileName}
              </button>
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
          <span>Comments ({post.totalCommentsReplies})</span>
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
        <CommentBox
          postId={post.id}
          postTitle={post.title} // Pass the post title
          postOwner={post.user} // Pass the entire user object
          isVisible={showChatBox[post.id]}
          onClose={() =>
            setShowChatBox((prev) => ({
              ...prev,
              [post.id]: false,
            }))
          }
        />
      )}
    </>
  );
}
