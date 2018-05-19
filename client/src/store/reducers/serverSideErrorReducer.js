import * as actionTypes from "../actions/actionTypes";

const initialState = {
  errors: {
    name: "",
    email: "",
    password: "",
    password2: ""
  }
};

const getServerSideErrors = (state, action) => {
  const serverErrors = {};
  for (const key in state.errors) {
    if (Object.prototype.hasOwnProperty.call(state.errors, key)) {
      serverErrors[key] = action.payload[key] || "";
    }
  }

  return {
    ...state,
    errors: {
      ...state.errors,
      ...serverErrors
    }
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SERVER_SIDE_ERRORS:
      return getServerSideErrors(state, action);
    default:
      return state;
  }
};

export default reducer;
