import React from "react";

import classes from "./Backdrop.css";

const backdrop = ({ show, handleClick }) =>
  show ? <div className={classes.Backdrop} onClick={handleClick} /> : null;

export default backdrop;
