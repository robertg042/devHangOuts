import React from "react";

import classes from "./Brand.css";

const brand = ({ children, linkUrl }) => {
  return (
    <div className={classes.Brand}>
      <a className={classes.shing} href={linkUrl}>
        {children}
      </a>
    </div>
  );
};

export default brand;
