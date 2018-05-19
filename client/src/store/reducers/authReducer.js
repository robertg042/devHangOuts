import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.Type) {
    case actionTypes.REGISTER_USER:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
