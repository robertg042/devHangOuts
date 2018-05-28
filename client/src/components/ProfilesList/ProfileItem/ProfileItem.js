import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./ProfileItem.css";
import { isEmpty, capitalizeFirstLetter } from "../../../shared/utils";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    const { user, status, location, handle, company } = profile;
    const { avatar, name } = user;

    return (
      <div className={classes.ProfileItem}>
        <div className={classes.Avatar}><img src={avatar} alt="User's avatar"/> </div>
        <div className={classes.Name}>{name}</div>
        <div className={classes.Status}>
          {capitalizeFirstLetter(status)} {!isEmpty(company) ? <span>at {company}</span> : null}
        </div>
        <div className={classes.Location}>{location}</div>
        <div className={classes.LinkToHandle}>{handle}</div>
        <div className={classes.Skills}>Skills</div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
