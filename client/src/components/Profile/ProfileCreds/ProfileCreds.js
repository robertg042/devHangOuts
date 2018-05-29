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
      items = experience.map(exp => {
        const listItemClasses = [classes.ListItem];
        if (isEmpty(exp.to)) {
          listItemClasses.push(classes.HighlightedBorder);
        }

        return (
          <li key={exp._id} className={listItemClasses.join(" ")}>
            <div className={classes.ListItemHeader}>{exp.company}</div>
            <div className={classes.Years}>
              <Moment
                format={"LL"}>{exp.from}
              </Moment> - {exp.to ? <Moment
                format={"LL"}>{exp.to}
              </Moment> : <span className={classes.HighlightedText}>Current</span>}
            </div>
            <div className={classes.BottomMargin}><span className={classes.Smaller}>Position: </span>{exp.title}</div>
            {!isEmpty(exp.location) ? <div className={classes.BottomMargin}><span className={classes.Smaller}>Location: </span>{exp.location}</div> : null}
            {!isEmpty(exp.description) ? <div className={classes.BottomMargin}><span className={classes.Smaller}>Description: </span>{exp.description}</div> : null}
          </li>
        );
      });
    }
    if (education) {
      items = education.map(edu => {
        const listItemClasses = [classes.ListItem];
        if (isEmpty(edu.to)) {
          listItemClasses.push(classes.HighlightedBorder);
        }

        return (
          <li key={edu._id} className={listItemClasses.join(" ")}>
            <div className={classes.ListItemHeader}>{edu.school}</div>
            <div className={classes.Years}>
              <Moment
                format={"LL"}>{edu.from}
              </Moment> - {edu.to ? <Moment
                format={"LL"}>{edu.to}
              </Moment> : <span className={classes.HighlightedText}>Current</span>}
            </div>
            <div className={classes.BottomMargin}><span className={classes.Smaller}>Degree: </span>{edu.degree}</div>
            <div className={classes.BottomMargin}><span className={classes.Smaller}>Field of study: </span>{edu.fieldofstudy}</div>
            {!isEmpty(edu.description) ? <div className={classes.BottomMargin}><span className={classes.Smaller}>Description: </span>{edu.description}</div> : null}
          </li>
        );
      });
    }

    let itemContents;
    if (items && items.length > 0) {
      itemContents = <ul className={classes.List}>{items}</ul>;
    } else {
      if (experience) {
        itemContents = <div>No experience added</div>;
      } else if (education) {
        itemContents = <div>No education added</div>;
      }
    }

    return (
      <div className={classes.ProfileCreds}>
        <div className={classes.Header}>
          {experience ? "Experience" : "Education"}
        </div>
        {itemContents}
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
