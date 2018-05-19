import * as actionsTypes from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { setAuthToken } from "../../shared/utils";
import { getServerSideErrors } from "./serverSideErrorActions";

export const setAuthenticatedUser = userData => {
  return {
    type: actionsTypes.LOGIN_USER,
    payload: userData
  };
};

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(() => {
      history.push("/login");
    })
    .catch(error => {
      dispatch(getServerSideErrors(error.response.data));
    });
};

export const loginUser = userData => dispatch => {
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
    })
    .catch(error => {
      dispatch(getServerSideErrors(error.response.data));
    });
};
