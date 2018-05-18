import * as actionTypes from "../actions/actionTypes";

const initialState = {
  name: "1",
  email: "2",
  password: "33",
  passwordRepeat: "444"
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
    case actionTypes.SAVE_PASSWORD_REPEAT_VALUE:
      return {
        ...state,
        passwordRepeat: action.value
      };
    default:
      return state;
  }
};

export default reducer;
