import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact linkUrl={"/developers"} floatLeft>
        Developers
      </NavigationItem>
      <NavigationItem exact linkUrl={"/signup"}>
        Sign up
      </NavigationItem>
      <NavigationItem exact linkUrl={"/login"}>
        Log in
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
