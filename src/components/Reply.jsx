/* eslint-disable react/prop-types */
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";

const Reply = ({
  reply,
  postOwner,
  user,
  onDeleteReply,
  showDeleteButton,
}) => {
  const generateAvatar = (name) => {
    return createAvatar(botttsNeutral, {
      seed: name || "default-avatar",
    }).toDataUri();
  };

  return (
    <div className="relative flex items-start gap-3 ml-8">
      <img
        src={generateAvatar(reply.user.avatar)}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <p className="text-gray-300 font-semibold text-sm">
            {reply.user.userName}
          </p>
          {reply.user.id === postOwner.id && (
            <span className="text-xs font-medium text-blue-500">Author</span>
          )}
          {showDeleteButton && (
            <button
              className="text-xs text-red-500 px-1 py-0.5 rounded hover:bg-red-500 hover:text-white transition-all"
              onClick={() => onDeleteReply(reply.commentId, reply.id)}
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
          <p className="text-gray-400 text-sm">{reply.replyContent}</p>
        </div>
        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
          <span>
            {formatDistanceToNow(new Date(reply.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reply;
