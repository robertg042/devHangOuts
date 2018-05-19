import { applyMiddleware, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);
/* eslint-enable */

export default store;
