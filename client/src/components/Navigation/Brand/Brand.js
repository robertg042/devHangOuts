import React from "react";
import { Link } from "react-router-dom";

import classes from "./Brand.css";

const brand = ({ children, linkUrl, exact }) => {
  return (
    <div className={classes.Brand}>
      <Link to={linkUrl} exact={exact}>
        {children}
      </Link>
    </div>
  );
};

export default brand;
