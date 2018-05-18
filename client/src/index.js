import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store/store";
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

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
