// import * as actionsTypes from "./actionTypes";
import { getServerSideErrors } from "./serverSideErrorActions";

import axios from "axios";

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

