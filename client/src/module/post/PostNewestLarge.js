import React, { useState, useContext } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import { postContext } from "contexts/postContext";
import { useNavigate } from "react-router-dom";
const PostNewestLargeStyles = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 1rem;
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
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

const PostNewestLarge = () => {
  const {
    postState: { lastpost },
    getNewestLargePost,
  } = useContext(postContext);

  useState(() => getNewestLargePost(), []);
  const navigate = useNavigate();

  return (
    <>
      {lastpost.map((post) => (
        <PostNewestLargeStyles>
          <PostImage
            url={`${
              post.image ||
              `https://images.unsplash.com/photo-1678047471351-84a24c661587?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            }`}
            alt=""
            to={`/post/${post?._id}`}
          ></PostImage>
          <PostCategory>{post?.category}</PostCategory>
          <PostTitle
            size="large"
            className="post-title"
            to={`/post/${post._id}`}
          >
            {post.title}
          </PostTitle>
          <PostMeta
            color="gray"
            authorName={post?.user?.username}
            userId={post?.user?._id}
            date={post?.date}
            className="cursor-pointer"
          ></PostMeta>
        </PostNewestLargeStyles>
      ))}
    </>
  );
};

export default PostNewestLarge;
