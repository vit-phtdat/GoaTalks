import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import { useNavigate } from "react-router-dom";

const PostItemStyles = styled.div`
  padding: 1em;
  background-color: ${(props) => props.theme.grayF3};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: inherit;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
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

const PostItem = ({ post }) => {
  const truncatedTitle = truncateTitle(post.title, 60);
  const navigate = useNavigate();
  return (
    <PostItemStyles className="cursor-pointer">
      <PostImage
        url={post?.image}
        alt="PostImage"
        to={`/post/${post._id}`}
      ></PostImage>
      <PostCategory type="secondary">{post?.category}</PostCategory>
      <PostTitle to={`/post/${post._id}`}>{truncatedTitle}</PostTitle>
      <PostMeta
        authorName={post?.user.username}
        userId={post?.user._id}
        date={post?.date}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
