import { createContext, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import axios from "axios";

export const postContext = createContext();

const PostContextProvider = ({ children }) => {
  // state
  const [postState, dispatch] = useReducer(postReducer, {
    post: {},
    posts: [],
    userposts: [],
    allposts: [],
    lastpost: [],
    smalllastposts: [],
    detailpost: [],
    postsLoading: true,
  });

  // get all posts
  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/post");
      if (response.data.success) {
        dispatch({
          type: "POSTS_LOADED_SUCCESS",
          payload: response.data.posts,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // get all postofuser
  const getAllPostsOfUser = async (id) => {
    try {
      const response = await axios.post("http://localhost:5000/api/post/postofuser", id);
      if (response.data.success) {
        dispatch({
          type: "POSTS_LOADED_SUCCESS_USER",
          payload: response.data.posts,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // get all posts
  const getAllPostsEver = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/post/allpost"
      );
      if (response.data.success) {
        dispatch({
          type: "ALL",
          payload: response.data.posts,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // get detailed post
  const getDetailedPost = async (PostId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/post/detailpost",
        PostId
      );
      if (response.data.success) {
        dispatch({
          type: "DETAIL_POST",
          payload: response.data.posts,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // get newest large post
  const getNewestLargePost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/post/newestpostlarge"
      );
      if (response.data.success) {
        dispatch({
          type: "LARGEST_POST",
          payload: response.data.posts,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // get newest post
  const getNewestPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/post/newestpost"
      );
      if (response.data.success) {
        dispatch({
          type: "NEWEST_POST",
          payload: response.data.posts,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // add post
  const addPost = async (Post) => {
    try {
      const response = await axios.post("http://localhost:5000/api/post", Post);
      if (response.data.success) {
        dispatch({ type: "ADD_POST", payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/post/${postId}`
      );
      if (response.data.success) {
        dispatch({ type: "DELETE_POST", payload: postId });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update post
  const updatePost = async (post, id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/post/${id}`, post
      );
      /*
			if (response.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user }
				})
			}
      */
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };

  // post context data
  const postContextData = {
    postState,
    getAllPosts,
    getAllPostsOfUser,
    getAllPostsEver,
    addPost,
    deletePost,
    getDetailedPost,
    getNewestLargePost,
    getNewestPost,
    updatePost,
  };

  return (
    <postContext.Provider value={postContextData}>
      {children}
    </postContext.Provider>
  );
};

export default PostContextProvider;
