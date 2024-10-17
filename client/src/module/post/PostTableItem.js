import React from "react";

const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) {
    return title;
  } else {
    return title.slice(0, maxLength) + "...";
  }
};

const PostTableItem = ({ post }) => {
  const truncatedTitle = truncateTitle(post.title, 60);
  return (
    <div className="flex items-center gap-x-3">
      <img
        src={post.image ? post.image : require("../../assets/logo.png")}
        alt=""
        className="w-[66px] h-[55px] rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{truncatedTitle}</h3>
        <time className="text-sm text-gray-500">{post?.date}</time>
      </div>
    </div>
  );
};

export default PostTableItem;
