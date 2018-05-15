import React from "react";
import PropTypes from "prop-types";

import classes from "./WidthWrapper.css";

const widthWrapper = ({children}) => {
  return (
    <div className={classes.WidthWrapper}>
      {children}
    </div>
  );
};

widthWrapper.propTypes = {

};

export default widthWrapper;
