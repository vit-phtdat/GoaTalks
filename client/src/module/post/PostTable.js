import { ActionDelete, ActionEdit, ActionView } from "components/action";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { postContext } from "../../contexts/postContext";
import { useNavigate } from "react-router-dom";
import PostTableItem from "./PostTableItem";

const PostTable = ({ filterposts, users, isAdmin = false, sortedPosts }) => {
  const detailPost = async (PostId) => {
    const id = PostId;
    const idPostInfo = { id };
    try {
      const content = await getDetailedPost(idPostInfo);
      // console.log(content.posts[0]);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#ef233c",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleted = await deletePost(postId);
          console.log(deleted);
          if (deleted["success"]) {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
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
  const { deletePost, getDetailedPost } = useContext(postContext);

  const navigate = useNavigate();
  // console.log(users);

  const getUser = (id) => {
    const user = users.filter((u) => {
      return u?._id === id;
    });
    return user[0]?.username;
  };

  return (
    <>
      {filterposts.length > 0
        ? filterposts?.map((post, index) => (
            <tr>
              <td>{`0${index + 1}`}</td>
              <td>
                <PostTableItem post={post}></PostTableItem>
              </td>
              <td>
                <span className="text-gray-500">{post?.category}</span>
              </td>
              <td>
                <span className="text-gray-500">
                  {getUser(post?.user?._id) || post?.user?.username}
                </span>
              </td>
              <td>
                <div className="flex items-center text-gray-500 gap-x-3">
                  <ActionView
                    onClick={() => navigate(`/post/${post?._id}`)}
                  ></ActionView>
                  {!isAdmin && (
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-post/${post?._id}`)
                      }
                    ></ActionEdit>
                  )}
                  <ActionDelete
                    onClick={() => handleDeletePost(post?._id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))
        : sortedPosts?.map((post, index) => (
            <tr>
              <td>{`0${index + 1}`}</td>
              <td>
                <PostTableItem post={post}></PostTableItem>
              </td>
              <td>
                <span className="text-gray-500">{post?.category}</span>
              </td>
              <td>
                <span className="text-gray-500">
                  {getUser(post?.user?._id) || post?.user?.username}
                </span>
              </td>
              <td>
                <div className="flex items-center text-gray-500 gap-x-3">
                  <ActionView
                    onClick={() => navigate(`/post/${post?._id}`)}
                  ></ActionView>
                  {!isAdmin && (
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-post/${post?._id}`)
                      }
                    ></ActionEdit>
                  )}
                  <ActionDelete
                    onClick={() => handleDeletePost(post?._id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
    </>
  );
};

export default PostTable;
