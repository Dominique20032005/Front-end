import React, { useState, useEffect } from "react";
import { useApiStorage } from "../hooks/useApiStorage";
import { useAuthStorage } from "../hooks/useAuthStrorage";
import { Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";
import DeleteCommentModal from "./DeleteCommentModal";
import Reply from "./Reply"; // Import the Reply component
import { AiOutlineLike } from "react-icons/ai"; // Importing like icon from react-icons

const CommentBox = ({ postId, postTitle, postOwner, isVisible, onClose }) => {
  const { fetchComments, addComment, likeComment, deleteComment, addReply, likeReply, deleteReply } =
    useApiStorage();
  const { user, isLoggedIn } = useAuthStorage();
  const [comments, setComments] = useState([]);
  const [replyInputs, setReplyInputs] = useState({}); // State to manage reply input visibility
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState(""); // State for new reply input
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const [animationCommentId, setAnimationCommentId] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    if (isVisible) {
      loadComments();
    }
  }, [isVisible]);

  const loadComments = async () => {
    setLoadingComments(true);
    try {
      const fetchedComments = await fetchComments(postId);
      const sortedComments = fetchedComments.sort((a, b) => b.id - a.id);
      setComments(sortedComments);
    } catch (error) {
      console.error("Failed to load comments:", error);
      toast.error("Failed to load comments. Please try again.");
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async () => {
    setLoading(true);
    try {
      const addedComment = await addComment(postId, newComment);
      setAnimationCommentId(addedComment.id);
      loadComments(); // Refresh comments after adding a new one
      setNewComment("");
      toast.success("Comment added successfully!");
      setTimeout(() => setAnimationCommentId(null), 500);
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await likeComment(postId, commentId);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likedByCurrentUser: response.isLiked,
              }
            : comment
        )
      );
    } catch (error) {
      console.error("Failed to like comment:", error);
      toast.error("Failed to like comment. Please try again.");
    }
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    try {
      await deleteComment(postId, commentToDelete);
      toast.success("Comment deleted successfully!");
      loadComments(); // Refresh comments after deleting
      setCommentToDelete(null);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  const handleAddReply = async (commentId, content) => {
    try {
      const addedReply = await addReply(postId, commentId, content);
      loadComments(); // Refresh comments to include new reply
      setReplyInputs((prev) => ({ ...prev, [commentId]: false })); // Hide input after reply
    } catch (error) {
      console.error("Failed to add reply:", error);
      toast.error("Failed to add reply. Please try again.");
    }
  };

  const handleLikeReply = async (commentId, replyId) => {
    try {
      await likeReply(postId, commentId, replyId);
      loadComments(); // Refresh comments to update reply like status
    } catch (error) {
      console.error("Failed to like reply:", error);
      toast.error("Failed to like reply. Please try again.");
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    try {
      await deleteReply(postId, commentId, replyId);
      loadComments(); // Refresh comments after deleting reply
    } catch (error) {
      console.error("Failed to delete reply:", error);
      toast.error("Failed to delete reply. Please try again.");
    }
  };

  const toggleReplyInput = (commentId) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const generateAvatar = (name) => {
    return createAvatar(botttsNeutral, {
      seed: name || "default-avatar",
    }).toDataUri();
  };

  if (!isVisible) {
    return null;
  }

  console.log(comments);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 animate-fade-in">
      <div className="w-[33%] max-w-3xl bg-gray-900 rounded-lg overflow-hidden animate-pop-up">
        {/* Header */}
        <div className="flex flex-col border-b border-gray-800">
          <div className="flex justify-between items-center p-4">
            <h3 className="text-white font-semibold">Comments</h3>
            <button
              className="text-gray-400 hover:text-red-500"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm">
            Commenting on {postOwner.userName}'s Post:
          </div>
        </div>

        {/* Comments Section */}
        <div
          className="p-4 overflow-y-auto bg-gray-850"
          style={{ height: "270px", backgroundColor: "#1A1D21" }}
        >
          {loadingComments ? (
            <div className="flex justify-center py-4">
              <Loader className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          ) : comments.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-400 text-lg font-semibold">
                No comments yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`relative flex flex-col gap-3 ${
                    comment.id === animationCommentId ? "animate-highlight" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={generateAvatar(comment.user.avatar)}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-300 font-semibold text-sm">
                          {comment.user.userName}
                        </p>
                        {comment.user.id === postOwner.id && (
                          <span className="text-xs font-medium text-blue-500">
                            Author
                          </span>
                        )}
                        {comment.user.id === user?.id && (
                          <button
                            className="text-xs text-red-500 px-1 py-0.5 rounded hover:bg-red-500 hover:text-white transition-all"
                            onClick={() => setCommentToDelete(comment.id)}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <div
                        className="bg-gray-700 p-3 rounded-lg max-w-full break-words relative"
                        style={{
                          display: "inline-block",
                          wordBreak: "break-word",
                          overflowWrap: "anywhere",
                          maxWidth: "calc(100% - 100%)",
                          minWidth: "fit-content",
                        }}
                      >
                        <p className="text-gray-400 text-sm">
                          {comment.commentContent}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span>
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                        <button
                          className={`${
                            comment.likedByCurrentUser
                              ? "text-green-500"
                              : "text-gray-500 hover:text-green-500"
                          }`}
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          {comment.likedByCurrentUser ? "Liked" : "Like"}
                        </button>
                        <button
                          className="hover:text-blue-500"
                          onClick={() => toggleReplyInput(comment.id)}
                        >
                          Reply
                        </button>
                        <span className="flex items-center gap-1 text-gray-400">
                          <AiOutlineLike className="w-4 h-4" />
                          <span>{comment.likesCount || 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Replies Section */}
                  {comment.replies.map((reply) => (
                    
                    <Reply
                      key={reply.id}
                      reply={reply}
                      postOwner={postOwner}
                      user={user}
                      onLikeReply={(replyId) => handleLikeReply(comment.id, replyId)}
                      onDeleteReply={(replyId) => handleDeleteReply(comment.id, replyId)}
                      showDeleteButton={reply.user.id === user?.id}
                    />
                  ))}

                  {/* Add Reply Input */}
                  {replyInputs[comment.id] && (
                    <div className="mt-2">
                      <input
                        type="text"
                        className="bg-gray-800 text-gray-300 rounded-full px-4 py-2 w-full"
                        placeholder="Write a reply..."
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newReply.trim() !== "") {
                            handleAddReply(comment.id, newReply);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comment Input Section */}
        <div className="p-4 border-t border-gray-800 flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <img
                src={generateAvatar(user?.avatar)}
                alt="Your Avatar"
                className="w-8 h-8 rounded-full"
              />
              <input
                type="text"
                className="flex-1 bg-gray-800 text-gray-300 rounded-full px-4 py-2 focus:outline-none"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (newComment.trim() === "") {
                      toast.error("Comment cannot be empty.");
                      return;
                    }
                    handleAddComment();
                  }
                }}
              />
              <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleAddComment}
                disabled={loading}
              >
                Post
              </button>
            </>
          ) : (
            <p className="text-gray-400 text-center w-full">
              Please log in to add a comment.
            </p>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {commentToDelete && (
        <DeleteCommentModal
          onConfirm={handleDeleteComment}
          onCancel={() => setCommentToDelete(null)}
        />
      )}
    </div>
  );
};

export default CommentBox;
