import * as actionTypes from "../actions/actionTypes";
import { isEmpty } from "../../shared/utils";

const initialState = {
  isAuthenticated: false,
  user: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: {
          ...state.user,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
