import Layout from "components/layout/Layout";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostMeta from "module/post/PostMeta";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostRelated from "module/post/PostRelated";
import { postContext } from "contexts/postContext";
import { authContext } from "contexts/authContext";
import HTMLReactParser from "html-react-parser";
import AuthorItem from "components/author/AuthorItem";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
  }
`;

const DetailPage = () => {
  const { slug } = useParams();
  const {
    postState: { detailpost, allposts },
    getDetailedPost,
    getAllPostsEver,
  } = useContext(postContext);
  const id = slug;
  const detailid = { id };
  useState(() => getDetailedPost(detailid), []);
  // console.log(detailpost);

  const {
    authState: { alluser },
    allUser,
  } = useContext(authContext);

  useState(() => allUser(), []);
  useState(() => getAllPostsEver(), []);

  const getUser = (id) => {
    const user = alluser.filter((u) => {
      return u._id === id;
    });
    return user[0];
  };

  const author = getUser(detailpost[0]?.user._id);

  let relatedPosts = allposts.filter((post) => {
    return (
      post?.category === detailpost[0]?.category &&
      post?._id !== detailpost[0]?._id
    );
  });
  relatedPosts =
    relatedPosts.length > 4 ? relatedPosts.slice(0, 4) : relatedPosts;
  return (
    <>
      {detailpost.map((post) => (
        <PostDetailsPageStyles>
          <Layout isHomePage={true}>
            <div className="container">
              <div className="post-header">
                <PostImage
                  url={post.image}
                  className="post-feature"
                ></PostImage>
                <div className="post-info">
                  <PostCategory className="mb-6">{post.category}</PostCategory>
                  <h1 className="post-heading">{post.title}</h1>
                  <PostMeta
                    date={post.date}
                    authorName={post.user.username}
                  ></PostMeta>
                </div>
              </div>
              <div className="post-content">
                <div className="entry-content">
                  {HTMLReactParser(post?.content || "")}
                </div>
                <AuthorItem user={author}></AuthorItem>
              </div>
              <PostRelated posts={relatedPosts}></PostRelated>
            </div>
          </Layout>
        </PostDetailsPageStyles>
      ))}
    </>
  );
};
export default DetailPage;
