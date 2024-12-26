import { useState } from 'react';
import { MoreHorizontal, MessageCircle, Bookmark, ThumbsUp, Trash2 } from 'lucide-react';

export default function PostInfo() {
  const [isLiked, setIsLiked] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleToggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className="max-w-xl bg-[#23272A] rounded-lg shadow-lg p-4 relative">
      {/* Delete and More Options */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <img
              src="/placeholder.svg"
              alt="VTV24 logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="font-semibold text-white">VTV24</h2>
            <p className="text-sm text-gray-400">18 phút</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-400 hover:bg-gray-800 hover:text-red-500 rounded-full transition-colors"
            onClick={() => alert('Post deleted!')}
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-800/50 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="aspect-video bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 p-8 flex items-center justify-center backdrop-blur-xl bg-opacity-80">
          <h1 className="text-white text-center text-2xl font-bold leading-tight">
            Phẫu thuật cắt bỏ khối u khổng lồ nặng 5kg, cứu sống bệnh nhân
          </h1>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="px-4 py-2 border-b border-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <ThumbsUp
              className={`w-4 h-4 ${
                isLiked ? 'text-teal-400 fill-current' : 'text-gray-400'
              }`}
            />
            <span>{isLiked ? '1.4K' : '1.3K'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{comments.length} bình luận</span>
            <span>5 lượt chia sẻ</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-4 py-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-800/50 rounded-lg transition-colors ${
            isLiked ? 'text-teal-400' : 'text-gray-300'
          }`}
          onClick={handleLikeClick}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>Likes</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800/50 rounded-lg transition-colors text-gray-300"
          onClick={handleToggleChatBox}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Comments</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800/50 rounded-lg transition-colors text-gray-300">
          <Bookmark className="w-5 h-5" />
          <span>Save</span>
        </button>
      </div>

      {/* Chat Box */}
      {showChatBox && (
        <div className="mt-4 bg-[#1A1D1F] p-4 rounded-lg shadow-lg">
          <h3 className="text-gray-300 font-semibold mb-2">Comments</h3>
          <div className="space-y-2 mb-4">
            {comments.map((c, index) => (
              <p key={index} className="text-gray-400 text-sm">
                {c}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-grow bg-gray-800 text-gray-300 p-2 rounded-lg"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
              onClick={handleAddComment}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
