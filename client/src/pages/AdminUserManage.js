import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { Table } from "components/table";
import { authContext } from "contexts/authContext";
import UserTable from "module/user/UserTable";
import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import styled from "styled-components";

const itemsPerPage = 4;

const AdminUserManageStyles = styled.div`
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

const AdminUserManage = () => {
  const {
    authState: { alluser },
    allUser,
  } = useContext(authContext);

  useState(() => allUser(), []);
  console.log(alluser);
  const searchTerm = useSelector((state) => state);

  const filteredUsers = alluser.filter((user) => {
    // Filter by title
    const isAuthorMatch = user.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Return true only if both date and category match
    return isAuthorMatch;
  });

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredUsers.slice(offset, offset + itemsPerPage);
  return (
    <AdminUserManageStyles>
      <Layout isAdmin={true}>
        <div className="small_container">
          <div className="author">
            <div className="flex items-center justify-between">
              <Heading>Authors</Heading>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>User Info</th>
                  <th>Email</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <UserTable
                  users={currentPageData}
                  sortedUsers={filteredUsers}
                ></UserTable>
              </tbody>
            </Table>
            <div className="pagination">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
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
    </AdminUserManageStyles>
  );
};

export default AdminUserManage;
