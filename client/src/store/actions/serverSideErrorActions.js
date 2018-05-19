import * as actionTypes from "./actionTypes";

export const getServerSideErrors = errors => {
  return {
    type: actionTypes.GET_SERVER_SIDE_ERRORS,
    payload: errors
  };
};

export const clearServerSideErrors = () => {
  return {
    type: actionTypes.CLEAR_SERVER_SIDE_ERRORS
  };
};
