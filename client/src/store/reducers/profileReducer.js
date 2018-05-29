import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profile: null,
  profiles: null,
  loading: null,
  profileFound: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_LOADING: {
      return {
        ...state,
        loading: action.isLoading
      };
    }
    case actionTypes.PROFILE_FOUND: {
      return {
        ...state,
        profileFound: action.profileFoundState
      };
    }
    case actionTypes.GET_PROFILE: {
      return {
        ...state,
        profile: action.payload
      };
    }
    case actionTypes.GET_PROFILES: {
      return {
        ...state,
        profiles: action.payload
      };
    }
    case actionTypes.CLEAR_CURRENT_PROFILE: {
      return {
        ...state,
        profile: null,
        profileFound: null
      };
    }
    default:
      return state;
  }
};

export default reducer;
