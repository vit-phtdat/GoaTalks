import React, { useContext, useState } from "react";
import styled from "styled-components";
import { authContext } from "contexts/authContext";
import Layout from "components/layout/Layout";
import { postContext } from "contexts/postContext";
import { useSelector } from "react-redux";
import { categories } from "utils/constants";
import Heading from "components/layout/Heading";
import ReactPaginate from "react-paginate";
import PostTable from "module/post/PostTable";
import { Table } from "components/table";

const AdminPageStyles = styled.div`
  .small_container {
    width: 65vw;
    margin: 0 auto;
    margin-top: 2rem;
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

const itemsPerPage = 4;

function parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
}

const AdminPage = () => {
  const {
    authState: { user, alluser },
    allUser,
  } = useContext(authContext);

  useState(() => allUser(), []);

  const {
    postState: { allposts },
    getAllPostsEver,
  } = useContext(postContext);

  useState(() => getAllPostsEver(), []);

  const [filters, setFilters] = useState({ date: "", category: "" });

  const searchTerm = useSelector((state) => state);

  const filteredPosts = allposts.filter((post) => {
    // Filter by category
    const isCategoryMatch =
      !filters.category || post.category === filters.category;

    // Filter by title
    const isTitleAndAuthorMatch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.username.toLowerCase().includes(searchTerm.toLowerCase());

    // Return true only if both date and category match
    return isCategoryMatch && isTitleAndAuthorMatch;
  });

  const handleDateChange = (e) => {
    setFilters({ ...filters, date: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Sort the posts array by date in descending order (latest to oldest)
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (filters.date === "Latest") {
      return parseDate(b.date) - parseDate(a.date);
    } else if (filters.date === "Oldest") {
      return parseDate(a.date) - parseDate(b.date);
    }
    return 0; // No change if 'selectedOrder' is neither 'latest' nor 'oldest'
  });

  const offset = currentPage * itemsPerPage;
  const currentPageData = sortedPosts.slice(offset, offset + itemsPerPage);

  if (!user || !user.isAdmin) {
    return <div>You don't have permission to access this page</div>;
  }

  return (
    <AdminPageStyles>
      <Layout isAdmin={true}>
        <div className="small_container">
          <div className="flex justify-between mb-10 filter_bar">
            <label className="p-3 text-black bg-gray-200 rounded-md ">
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
            <label className="p-3 text-black bg-gray-200 rounded-md">
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
          <div className="posts">
            <div className="flex items-center justify-between">
              <Heading>Posts</Heading>
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
                <PostTable
                  users={alluser}
                  filterposts={currentPageData}
                  sortedPosts={sortedPosts}
                  isAdmin={true}
                ></PostTable>
              </tbody>
            </Table>
            <div className="pagination">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(filteredPosts.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </Layout>
    </AdminPageStyles>
  );
};

export default AdminPage;
