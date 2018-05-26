import * as actionsTypes from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { setAuthToken } from "../../shared/utils";
import { getServerSideErrors } from "./serverSideErrorActions";
import { clearCurrentProfile } from "./profileActions";

export const setAuthenticatedUser = userData => {
  return {
    type: actionsTypes.SET_USER,
    payload: userData
  };
};

export const setAuthLoading = isLoading => {
  return {
    type: actionsTypes.AUTH_LOADING,
    isLoading: isLoading
  };
};

export const registerUser = (userData, history) => dispatch => {
  dispatch(setAuthLoading(true));
  axios
    .post("/api/users/register", userData)
    .then(() => {
      dispatch(setAuthLoading(false));
      history.push("/login");
    })
    .catch(error => {
      dispatch(getServerSideErrors(error.response.data));
      dispatch(setAuthLoading(false));
    });
};

export const loginUser = userData => dispatch => {
  dispatch(setAuthLoading(true));
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save token
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // decode token
      const userFromToken = jwt_decode(token);

      dispatch(setAuthenticatedUser(userFromToken));
      dispatch(setAuthLoading(false));
    })
    .catch(error => {
      dispatch(getServerSideErrors(error.response.data));
      dispatch(setAuthLoading(false));
    });
};

export const logoutUser = () => dispatch => {
  dispatch(clearCurrentProfile());
  if (localStorage.jwtToken) {
    localStorage.removeItem("jwtToken");
  }
  setAuthToken(null);
  dispatch(setAuthenticatedUser({}));
};
