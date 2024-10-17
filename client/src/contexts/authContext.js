import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants";
import setAuthToken from "../utils/setAuthToken";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    userbyId: [],
    alluser: []
  });

  // authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get("http://localhost:5000/api/auth");
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useState(() => loadUser(), []);

  // login
  const loginUser = async (User) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        User
      );
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };

  //user by id
  const getUserbyId = async (id) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/getuser", id);
      if (response.data.success) {
        dispatch({
          type: "USER_BY_ID",
          payload: { userbyId: response.data.users }
        });
      }
      return response.data;
    } 
    catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };

  // register
  const registerUser = async (User) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        User
      );
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }

      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };

  // update User
  const updateUser = async (User, id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/${id}`,
        User
      );
      /*
			if (response.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user }
				})
			}
      */
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };

  // follow User
  const followUser = async (id) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/follow',
        id
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

  // follow User
  const unfollowUser = async (id) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/unfollow',
        id
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

  // log out
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  const allUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/alluser");
      if (response.data.success) {
        dispatch({
          type: "ALL_USER",
          payload: { alluser: response.data.users }
        });
      }
    } 
    catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  }

  // delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/auth/${userId}`
      );
      if (response.data.success) {
        dispatch({ type: "DELETE_USER", payload: userId });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //context data
  const authContextData = {
    loginUser,
    authState,
    registerUser,
    logoutUser,
    updateUser,
    allUser,
    getUserbyId,
    deleteUser,
    followUser,
    unfollowUser
  };

  // return provider
  return (
    <authContext.Provider value={authContextData}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
