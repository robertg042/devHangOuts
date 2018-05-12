import React from "react";

import classes from "./NavigationItem.css";

const navigationItem = ({ children, linkUrl, active, floatLeft }) => {
  const navItemStyles = [classes.NavigationItem];
  const anchorStyles = [];
  if (active) {
    anchorStyles.push(classes.active);
  }
  if (floatLeft) {
    navItemStyles.push(classes.floatLeft);
  }

  return (
    <li className={navItemStyles.join(" ")}>
      <a className={anchorStyles.join(" ")} href={linkUrl}>
        {children}
      </a>
    </li>
  );
};

export default navigationItem;
