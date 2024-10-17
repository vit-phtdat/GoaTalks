import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostFeature from "module/post/PostFeature";
import { postContext } from "contexts/postContext";

const HomeFeatureStyles = styled.div`
  .view-all {
    font-size: 1em;
    color: ${(props) => props.theme.tertiary};
    font-weight: 600;
    cursor: pointer;
    position: relative;
    &:before {
      content: "";
      width: calc(1em + 1vw);
      height: 4px;
      background-color: ${(props) => props.theme.accent};
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(0, 150%);
    }
  }
`;

const HomeFeature = () => {
  const {
    postState: { allposts },
    getAllPostsEver,
  } = useContext(postContext);

  useState(() => getAllPostsEver(), []);
  const navigate = useNavigate();
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <div className="flex items-center justify-between">
          <Heading>Feature</Heading>
          <span onClick={() => navigate("/blog")} className="view-all">
            View all
          </span>
        </div>
        <div className="grid-layout">
          <PostFeature posts={allposts}></PostFeature>
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
