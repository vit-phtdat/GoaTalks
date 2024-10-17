import Heading from "components/layout/Heading";
import React from "react";
import PostItem from "./PostItem";

const PostRelated = ({ posts }) => {
  return (
    <div className="post-related">
      <Heading>Related Posts</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts.map((post) => (
          <PostItem post={post}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default PostRelated;
