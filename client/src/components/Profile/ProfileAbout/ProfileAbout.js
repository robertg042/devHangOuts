import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./ProfileAbout.css";
import { isEmpty, capitalizeFirstLetter } from "../../../shared/utils";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const { user, bio, skills } = profile;

    // eslint-disable-next-line
    const firstName = capitalizeFirstLetter(user.name.trim().split(" ")[0]);

    let skillBox = null;
    if (!isEmpty(skills)) {
      const skillList = skills.map(skill => (
        <div key={skill}>
          <i style={{ color: "var(--highlight-color)" }} className={"fas fa-check"}/>{skill}
        </div>
      ));
      skillBox = <div className={classes.SkillBox}>{skillList}</div>;
    }

    return (
      <Fragment>
        <div className={classes.Bio}>
          <div className={classes.Header}>
            {firstName}&apos;s bio
          </div>
          {!isEmpty(bio) ? <div className={classes.BioBody}>{bio}</div> : <div className={classes.Body}>{firstName} has no bio</div>}
        </div>
        <div className={classes.Skills}>
          <div className={classes.Header}>
            Skills
          </div>
          {skillBox ? <div className={classes.Body}>{skillBox}</div> : <div className={classes.Body}>No skills added</div>}
        </div>
      </Fragment>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
