import axios from "axios";

import * as actionsTypes from "./actionTypes";

export const setProfileLoading = () => {
  return {
    type: actionsTypes.PROFILE_LOADING
  };
};

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios.get("/api/profile")
    .then(res => {
      dispatch({
        type: actionsTypes.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({
        type: actionsTypes.GET_PROFILE,
        payload: {}
      });
    });
};

export const clearCurrentProfile = () => {
  return {
    type: actionsTypes.CLEAR_CURRENT_PROFILE
  };
};
