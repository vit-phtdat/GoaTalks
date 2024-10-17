import React, { useContext, useState } from "react";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import styled from "styled-components";
import PostTable from "./PostTable";
import { categories } from "utils/constants";
import { postContext } from "contexts/postContext";
import ReactPaginate from "react-paginate";
import { authContext } from "contexts/authContext";

const PostManageStyles = styled.div`
  @media screen and (max-width: 800px) {
    .dropdown {
      display: none;
    }
  }
  @media screen and (max-width: 593px) {
    .search-post {
      display: none;
    }
    .heading {
      margin-bottom: 3.5em;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
    ul {
      display: flex;
      gap: 1rem;
    }
    .active {
      background-color: black;
      color: #fff;
      border-radius: 4px;
      padding: 5px 10px;
    }
  }
`;

const itemsPerPage = 3;

function parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
}

const PostManage = () => {
  const {
    postState: { posts },
    getAllPosts,
  } = useContext(postContext);

  useState(() => getAllPosts(), []);

  const {
    authState: { alluser },
    allUser,
  } = useContext(authContext);
  useState(() => allUser(), []);

  const [filters, setFilters] = useState({
    title: "",
    category: "",
    author: "",
    date: "",
  });

  const filteredPosts = posts?.filter((post) => {
    // Filter by category
    const isCategoryMatch =
      !filters.category || post.category === filters.category;

    // Filter by title
    const isTitleMatch =
      !filters.title ||
      post.title.toLowerCase().includes(filters.title.toLowerCase());

    // Return true only if both date and category match
    return isCategoryMatch && isTitleMatch;
  });

  const handleDateChange = (e) => {
    setFilters({ ...filters, date: e.target.value });
  };
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleTitleChange = (e) => {
    setFilters({ ...filters, title: e.target.value });
  };

  console.log(filteredPosts);

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (filters.date === "Latest") {
      return parseDate(b.date) - parseDate(a.date);
    } else if (filters.date === "Oldest") {
      return parseDate(a.date) - parseDate(b.date);
    }
    return 0;
  });
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = sortedPosts?.slice(offset, offset + itemsPerPage);

  return (
    <PostManageStyles>
      <div className="heading">
        <DashboardHeading
          title="All posts"
          desc="Manage all your posts easily here"
          responsive={true}
        ></DashboardHeading>
      </div>
      <div className="flex justify-end gap-5 mb-10">
        <div className="flex items-center date-filter justify-normal">
          <label className="p-4 text-black bg-gray-200 rounded-md ">
            <select
              className="bg-inherit"
              value={filters.date}
              onChange={handleDateChange}
            >
              <option value="">Filter by Date</option>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </label>
        </div>
        <div className="flex items-center justify-center category-filter">
          <label className="p-4 text-black bg-gray-200 rounded-md">
            <select
              className="bg-inherit"
              value={filters.category}
              onChange={handleCategoryChange}
            >
              {categories.map((item) =>
                item.name === "All Categories" ? (
                  <option value="">{item.name}</option>
                ) : (
                  <option value={item.name}>{item.name}</option>
                )
              )}
            </select>
          </label>
        </div>
        <div className="w-full max-w-[300px] search-post">
          <input
            type="text"
            className="w-full p-4 border border-gray-500 border-solid rounded-lg shadow-sm"
            placeholder="Search post..."
            onChange={handleTitleChange}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            <PostTable
              filterposts={currentPageData}
              sortedPosts={sortedPosts}
              users={alluser}
            ></PostTable>
          ) : (
            <p className="p-5 ">
              You haven't shared anything dude! Let we know your thoughts.
            </p>
          )}
        </tbody>
      </Table>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(filteredPosts?.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </PostManageStyles>
  );
};

export default PostManage;
