import React from "react";

import classes from "./ToggleButton.css";

const toggleButton = ({ handleClick }) => {
  // let toggleButtonClasses = [classes.ToggleButton];

  return (
    <div className={classes.ToggleButton}>
      <i onClick={handleClick} className={"fas fa-bars"} />
    </div>
  );
};

export default toggleButton;
