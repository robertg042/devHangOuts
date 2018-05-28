import axios from "axios";

import * as actionsTypes from "./actionTypes";
import { getServerSideErrors } from "./serverSideErrorActions";
import { logoutUser } from "./authActions";

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

export const addExperience = (experienceData, history) => dispatch => {
  dispatch(setProfileLoading(true));
  axios.post("/api/profile/experience", experienceData)
    .then(() => {
      dispatch(setProfileLoading(false));
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch(getServerSideErrors(error.response.data));
      dispatch(setProfileLoading(false));
    });
};

export const addEducation = (educationData, history) => dispatch => {
  dispatch(setProfileLoading(true));
  axios.post("/api/profile/education", educationData)
    .then(() => {
      dispatch(setProfileLoading(false));
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch(getServerSideErrors(error.response.data));
      dispatch(setProfileLoading(false));
    });
};

export const deleteExperience = id => dispatch => {
  dispatch(setProfileLoading(true));
  axios.delete(`/api/profile/experience/${id}`)
    .then(() => {
      dispatch(setProfileLoading(false));
      dispatch(getCurrentProfile());
    })
    .catch(error => {
      dispatch(getServerSideErrors(error.response.data));
      dispatch(setProfileLoading(false));
    });
};

export const deleteEducation = id => dispatch => {
  dispatch(setProfileLoading(true));
  axios.delete(`/api/profile/education/${id}`)
    .then(() => {
      dispatch(setProfileLoading(false));
      dispatch(getCurrentProfile());
    })
    .catch(error => {
      dispatch(getServerSideErrors(error.response.data));
      dispatch(setProfileLoading(false));
    });
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading(true));

  axios.get("/api/profile/all")
    .then(res => {
      dispatch({
        type: actionsTypes.GET_PROFILES,
        payload: res.data
      });
      dispatch(setProfileLoading(false));
    })
    .catch(() => {
      dispatch({
        type: actionsTypes.GET_PROFILES,
        payload: null
      });
      dispatch(setProfileLoading(false));
    });
};

export const deleteAccount = history => dispatch => {
  // eslint-disable-next-line
  if (window.confirm("You are about to DELETE your account. This cannot be undone! Are you sure?")) {
    dispatch(setProfileLoading(true));
    axios.delete("/api/profile")
      .then(() => {
        dispatch(setProfileLoading(false));
        dispatch(logoutUser());
        history.push("/redirect", { message: "Your account was successfully deleted", to: "home page", url: "/" });
      })
      .catch(error => {
        dispatch(getServerSideErrors(error.response.data));
        dispatch(setProfileLoading(false));
      });
  }
};
