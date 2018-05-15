import React from "react";

import classes from "./Landing.css";

const landing = () => {
  return (
    <div className={classes.Landing}>
      <div className={classes.overlay} />
      <div className={classes.Content}>
        <div className={classes.Header}>Title</div>
        <div className={classes.Leading}>Leading</div>
        <div className={classes.Signup}>Sign up</div>
      </div>
    </div>
  );
};

export default landing;
