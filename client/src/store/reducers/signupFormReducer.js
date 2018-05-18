import * as actionTypes from "../actions/actionTypes";

const initialState = {
  name: "1",
  email: "2",
  password: "33",
  password2: "444"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_NAME_VALUE:
      return {
        ...state,
        name: action.value
      };
    case actionTypes.SAVE_EMAIL_VALUE:
      return {
        ...state,
        email: action.value
      };
    case actionTypes.SAVE_PASSWORD_VALUE:
      return {
        ...state,
        password: action.value
      };
    case actionTypes.SAVE_PASSWORD2_VALUE:
      return {
        ...state,
        password2: action.value
      };
    default:
      return state;
  }
};

export default reducer;
