import React, { useContext } from "react";
import UserTableItem from "./UserTableItem";
import { ActionDelete, ActionView } from "components/action";
import { useNavigate } from "react-router-dom";
import { authContext } from "contexts/authContext";
import Swal from "sweetalert2";

const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) {
    return title;
  } else {
    return title.slice(0, maxLength) + "...";
  }
};

const UserTable = ({ users, sortedUsers }) => {
  const navigate = useNavigate();
  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: "Are you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#ef233c",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleted = await deleteUser(userId);
          if (deleted["success"]) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          } else {
            Swal.fire("Error occured");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const { deleteUser } = useContext(authContext);
  return (
    <>
      {users.length > 0
        ? users.map((user, index) => (
            <tr>
              <td>{`0${index + 1}`}</td>
              <td>
                <UserTableItem user={user}></UserTableItem>
              </td>
              <td>
                <span className="text-gray-500">{user?.email}</span>
              </td>
              <td>
                <span className="text-gray-500">
                  {user?.description
                    ? truncateTitle(user?.description, 20)
                    : ""}
                </span>
              </td>
              <td>
                <div className="flex items-center text-gray-500 gap-x-3">
                  <ActionView
                    onClick={() => navigate(`/user/${user?._id}`)}
                  ></ActionView>
                  <ActionDelete
                    onClick={() => handleDeleteUser(user._id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))
        : sortedUsers.map((user, index) => (
            <tr>
              <td>{`0${index + 1}`}</td>
              <td>
                <UserTableItem user={user}></UserTableItem>
              </td>
              <td>
                <span className="text-gray-500">{user?.email}</span>
              </td>
              <td>
                <span className="text-gray-500">
                  {user?.description
                    ? truncateTitle(user?.description, 20)
                    : ""}
                </span>
              </td>
              <td>
                <div className="flex items-center text-gray-500 gap-x-3">
                  <ActionView
                    onClick={() => navigate(`/user/${user?._id}`)}
                  ></ActionView>
                  <ActionDelete
                    onClick={() => handleDeleteUser(user._id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
    </>
  );
};

export default UserTable;
