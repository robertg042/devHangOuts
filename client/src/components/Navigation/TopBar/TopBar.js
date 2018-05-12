import React from "react";

import classes from "./TopBar.css";
import Brand from "../Brand/Brand";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../SideDrawer/ToggleButton/ToggleButton";

const topBar = ({ toggleDrawer }) => {
  return (
    <header className={classes.TopBar}>
      <Brand linkUrl={"/"}>devHangOuts</Brand>
      <nav className={"MobileInvisible"}>
        <NavigationItems />
      </nav>
      <ToggleButton handleClick={toggleDrawer} />
    </header>
  );
};

export default topBar;
