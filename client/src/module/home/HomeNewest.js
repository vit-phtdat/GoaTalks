import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostNewestItem from "../post/PostNewestItem";
import PostNewestLarge from "../post/PostNewestLarge";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const HomeNewest = () => {
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Newest Update</Heading>
        <div className="layout">
          <PostNewestLarge></PostNewestLarge>
          <div className="newest-item-sidebar">
            <PostNewestItem></PostNewestItem>
          </div>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
