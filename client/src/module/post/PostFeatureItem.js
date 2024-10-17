import React from "react";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  height: 269px;
  .post {
    &-image {
      display: block;
      width: 100%;
      height: 269px;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;

const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) {
    return title;
  } else {
    return title.slice(0, maxLength) + "...";
  }
};

const PostFeatureItem = ({ post }) => {
  const truncatedTitle = truncateTitle(post?.title, 60);
  const navigate = useNavigate();

  return (
    <PostFeatureItemStyles>
      <PostImage
        url={post?.image}
        alt="unsplash"
        to={`/post/${post?._id}`}
      ></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory>{post?.category}</PostCategory>
          <PostMeta
            color="inherit"
            authorName={post?.user.username}
            userId={post?.user._id}
            date={post?.date}
          ></PostMeta>
        </div>
        <PostTitle size="large" to={`/post/${post?._id}`}>
          {truncatedTitle}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
