import { combineReducers } from "redux";
import signupFormReducer from "./signupFormReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import serverSideErrorReducer from "./serverSideErrorReducer";

const rootReducer = combineReducers({
  signup: signupFormReducer,
  auth: authReducer,
  profile: profileReducer,
  serverErrors: serverSideErrorReducer
});

export default rootReducer;
