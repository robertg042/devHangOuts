import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={"/"} floatLeft>
        Developers
      </NavigationItem>
      <NavigationItem link={"/"} active>
        Sign up
      </NavigationItem>
      <NavigationItem link={"/"}>Log in</NavigationItem>
    </ul>
  );
};

export default navigationItems;
