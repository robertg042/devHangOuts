import React from "react";

import classes from "./ToggleButton.css";

const toggleButton = ({ handleClick }) => {
  return (
    <div className={classes.ToggleButton}>
      <i onClick={handleClick} className={"fas fa-bars"} />
    </div>
  );
};

export default toggleButton;
