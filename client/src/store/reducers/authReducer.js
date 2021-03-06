import * as actionTypes from "../actions/actionTypes";
import { isEmpty } from "../../shared/utils";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: {
          ...state.user,
          ...action.payload
        },
        loading: false
      };
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        loading: action.isLoading
      };
    default:
      return state;
  }
};

export default reducer;
