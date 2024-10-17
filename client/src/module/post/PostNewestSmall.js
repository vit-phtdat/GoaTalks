import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import { useNavigate } from "react-router-dom";
const PostNewestSmallStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 250px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) {
    return title;
  } else {
    return title.slice(0, maxLength) + "...";
  }
};

const PostNewestSmall = ({ post }) => {
  const truncatedTitle = truncateTitle(post.title, 60);
  const navigate = useNavigate();
  return (
    <PostNewestSmallStyles className="shadow-xl cursor-pointer rounded-2xl">
      <PostImage
        url={`${
          post?.image ||
          `https://images.unsplash.com/photo-1678047471351-84a24c661587?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
        }`}
        alt=""
        to={`/post/${post._id}`}
      ></PostImage>
      <div className="p-3 bot">
        <PostCategory>{post?.category}</PostCategory>
        <PostTitle
          size="medium"
          className="post-title"
          to={`/post/${post._id}`}
        >
          {truncatedTitle}
        </PostTitle>
        <PostMeta
          color="gray"
          authorName={post.user.username}
          userId={post.user._id}
          date={post?.date}
        ></PostMeta>
      </div>
    </PostNewestSmallStyles>
  );
};

export default PostNewestSmall;
