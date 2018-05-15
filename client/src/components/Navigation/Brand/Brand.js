import React from "react";
import { Link } from "react-router-dom";

import classes from "./Brand.css";

const brand = ({ children, linkUrl, location }) => {
  let brandClasses = [classes.Brand];
  if (location === "top") {
    brandClasses = [classes.Brand, classes.Top];
  }
  if (location === "side") {
    brandClasses = [classes.Brand, classes.Side];
  }

  return (
    <div className={brandClasses.join(" ")}>
      <Link to={linkUrl}>{children}</Link>
    </div>
  );
};

export default brand;
