import React, { Component } from "react";
import Moment from "react-moment";

import classes from "./ProfileCreds.css";
import { isEmpty, capitalizeFirstLetter } from "../../../shared/utils";

class ProfileCreds extends Component {
  render() {
    const experience = this.props.experience || null;
    const education = this.props.education || null;

    return (
      <div className={classes.ProfileCreds}>
        ProfileCreds
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  experience: (props, propName, componentName) => {
    if (!props.experience && !props.education) {
      return new Error(
        `One of props 'experience' or 'education' is required in '${componentName}'.`
      );
    }
  },
  education: (props, propName, componentName) => {
    if (!props.experience && !props.education) {
      return new Error(
        `One of props 'experience' or 'education' is required in '${componentName}'.`
      );
    }
  }
};

ProfileCreds.defaultProps = {
  experience: null,
  education: null
};

export default ProfileCreds;
