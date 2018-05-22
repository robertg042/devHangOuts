import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.css";

const navigationItem = ({ children, linkUrl, exact, floatLeft, location }) => {
  const navItemStyles = [classes.NavigationItem];
  if (floatLeft) {
    navItemStyles.push(classes.floatLeft);
  }

  let link = null;
  if (location) {
    link = (
      <NavLink exact={exact} to={location} activeClassName={classes.active}>
        {children}
      </NavLink>);
  } else if (linkUrl) {
    link = (
      <NavLink exact={exact} to={linkUrl} activeClassName={classes.active}>
        {children}
      </NavLink>);
  }

  return (
    <li className={navItemStyles.join(" ")}>
      {link}
    </li>
  );
};

export default navigationItem;
