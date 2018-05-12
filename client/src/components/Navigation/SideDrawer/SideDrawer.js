import React from "react";

import classes from "./SideDrawer.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Brand from "../Brand/Brand";
import CloseButton from "../../UI/CloseButton/CloseButton";

const sideDrawer = ({ handleClose, show }) => {
  let sideDrawerClasses = [classes.SideDrawer, classes.Closed];
  if (show) {
    sideDrawerClasses = [classes.SideDrawer, classes.Opened];
  }

  return (
    <React.Fragment>
      <Backdrop show={show} handleClick={handleClose} />
      <div className={sideDrawerClasses.join(" ")}>
        <CloseButton handleClick={handleClose} />
        <nav>
          <Brand linkUrl={"/"} exact location={"side"}>
            devHangOuts
          </Brand>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
