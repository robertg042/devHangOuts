import * as actionTypes from "../actions/actionTypes";

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordRepeat: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_NAME_VALUE:
      return {
        ...state,
        name: action.value
      };
    default:
      return state;
  }
};

export default reducer;
