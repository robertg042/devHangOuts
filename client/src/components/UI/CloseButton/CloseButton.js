import React from "react";

import classes from "./CloseButton.css";

const closeButton = ({ handleClick }) => {
  return (
    <div className={classes.CloseButton}>
      <i onClick={handleClick} className={"fas fa-times"} />
    </div>
  );
};

export default closeButton;
