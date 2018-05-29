import React, { Component } from "react";
import Moment from "react-moment";

import classes from "./ProfileCreds.css";
import { isEmpty } from "../../../shared/utils";

class ProfileCreds extends Component {
  render() {
    const experience = this.props.experience || null;
    const education = this.props.education || null;

    let items;
    if (experience) {
      items = experience.map(exp => (
        <li key={exp._id} className={classes.ListItem}>
          <div className={classes.ListItemHeader}>{exp.company}</div>
          <div className={classes.Years}>
            <Moment
              format={"LL"}>{exp.from}
            </Moment> - {exp.to ? <Moment
              format={"LL"}>{exp.to}
            </Moment> : "Current"}
          </div>
          <div className={classes.Position}>Position: {exp.title}</div>
          {!isEmpty(exp.location) ? <div className={classes.Location}>{exp.location}</div> : null}
          {!isEmpty(exp.description) ? <div className={classes.Description}>{exp.description}</div> : null}
        </li>
      ));
    }
    if (education) {
      items = education.map(edu => (
        <li key={edu._id} className={classes.ListItem}>
          <div className={classes.ListItemHeader}>{edu.school}</div>
          <div className={classes.Years}>
            <Moment
              format={"LL"}>{edu.from}
            </Moment> - {edu.to ? <Moment
              format={"LL"}>{edu.to}
            </Moment> : "Current"}
          </div>
          <div className={classes.Position}>Degree: {edu.degree}</div>
          <div className={classes.FieldOfStudy}>Degree: {edu.fieldofstudy}</div>
          {!isEmpty(edu.description) ? <div className={classes.Description}>{edu.description}</div> : null}
        </li>
      ));
    }

    return (
      <div className={classes.ProfileCreds}>
        <div className={classes.Header}>
          {experience ? "Experience" : "Education"}
        </div>
        {/*eslint-disable-next-line*/}
        {items && items.length > 0 ? (
          <ul className={classes.List}>{items}</ul>
        ) : experience ? <div>No experience added</div> : <div>No education added</div>}
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
