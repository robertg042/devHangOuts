import { combineReducers } from "redux";
import signupFormReducer from "./signupFormReducer";
import authReducer from "./authReducer";
import serverSideErrorReducer from "./serverSideErrorReducer";

const rootReducer = combineReducers({
  signup: signupFormReducer,
  auth: authReducer,
  serverErrors: serverSideErrorReducer
});

export default rootReducer;
