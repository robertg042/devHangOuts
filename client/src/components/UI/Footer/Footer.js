import React from "react";

import classes from "./Footer.css";

const footer = () => {
  return (
    <div className={[classes.Footer, "lato300"].join(" ")}>
      <i className={"fa fa-copyright"} /> devHangOuts {new Date().getFullYear()}
    </div>
  );
};

export default footer;
