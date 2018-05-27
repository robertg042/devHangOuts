import axios from "axios";

import * as actionsTypes from "./actionTypes";
import { getServerSideErrors } from "./serverSideErrorActions";

export const setProfileLoading = isLoading => {
  return {
    type: actionsTypes.PROFILE_LOADING,
    isLoading: isLoading
  };
};

export const createProfile = (profileData, history) => dispatch => {
  dispatch(setProfileLoading(true));
  axios.post("/api/profile", profileData)
    .then(() => {
      dispatch(setProfileLoading(false));
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch(getServerSideErrors(error.response.data));
      dispatch(setProfileLoading(false));
    });
};


export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading(true));

  axios.get("/api/profile")
    .then(res => {
      dispatch({
        type: actionsTypes.GET_PROFILE,
        payload: res.data
      });
      dispatch(setProfileLoading(false));
    })
    .catch(() => {
      dispatch({
        type: actionsTypes.GET_PROFILE,
        payload: {}
      });
      dispatch(setProfileLoading(false));
    });
};

export const clearCurrentProfile = () => {
  return {
    type: actionsTypes.CLEAR_CURRENT_PROFILE
  };
};
