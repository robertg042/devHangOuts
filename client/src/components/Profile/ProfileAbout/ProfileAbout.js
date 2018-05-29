import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./ProfileAbout.css";
import { isEmpty, capitalizeFirstLetter } from "../../../shared/utils";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const { user, bio } = profile;

    // eslint-disable-next-line
    const firstName = user.name.trim().split(" ")[0];

    return (
      <div className={classes.ProfileAbout}>
        <div className={classes.Header}>
          {capitalizeFirstLetter(firstName)}&apos;s bio
        </div>
        {!isEmpty(bio) ? <div className={classes.Bio}>{bio}</div> : <div className={classes.Bio}>{firstName} has no bio</div>}
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
