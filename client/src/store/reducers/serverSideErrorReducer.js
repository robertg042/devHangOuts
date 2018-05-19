import * as actionTypes from "../actions/actionTypes";

const initialState = {
  errors: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SERVER_SIDE_ERRORS:
      return {
        ...state,
        errors: {
          ...action.payload
        }
      };
    case actionTypes.CLEAR_SERVER_SIDE_ERRORS:
      return {
        ...state,
        errors: {}
      };
    default:
      return state;
  }
};

export default reducer;
