import { combineReducers } from "redux";
import signupFormInput from "./signupFormReducer";

const rootReducer = combineReducers({
  signup: signupFormInput
});

export default rootReducer;
