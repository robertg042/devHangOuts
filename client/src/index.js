import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import signupFormInput from "./store/reducers/signupFormInput";
import registerServiceWorker from "./registerServiceWorker";
import "./assets/styles/sanitize.global.css";
import "./assets/fonts/font-awesome/fontawesome-all.global.css";
import "./assets/fonts/open-sans/opensans.global.css";
import "./assets/fonts/lato/latofonts.global.css";
import "./assets/styles/global.css";

Object.filterKeys = (obj, predicate) =>
  Object.assign(
    ...Object.keys(obj)
      .filter(key => predicate(key))
      .map(key => ({ [key]: obj[key] }))
  );

const rootReducer = combineReducers({
  signup: signupFormInput
});
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
