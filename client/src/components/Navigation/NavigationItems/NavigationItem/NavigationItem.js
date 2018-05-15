import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.css";

const navigationItem = ({ children, linkUrl, exact, floatLeft }) => {
  const navItemStyles = [classes.NavigationItem];
  if (floatLeft) {
    navItemStyles.push(classes.floatLeft);
  }

  return (
    <li className={navItemStyles.join(" ")}>
      <NavLink exact={exact} to={linkUrl} activeClassName={classes.active}>
        {children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
