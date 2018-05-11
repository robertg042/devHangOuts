import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./assets/fonts/font-awesome/fontawesome-all.global.css";
import "./assets/fonts/open-sans/opensans.global.css";
import "./assets/fonts/lato/latofonts.global.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
