import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./ProfileItem.css";
import Button from "../../UI/Button/Button";
import { isEmpty, capitalizeFirstLetter } from "../../../shared/utils";

class ProfileItem extends Component {
  go = path => {
    this.props.history.push(path);
  };

  render() {
    const { profile } = this.props;
    const { user, status, location, handle, company, skills } = profile;
    const { avatar, name } = user;

    let skillBox = null;
    if (!isEmpty(skills)) {
      const skillList = skills.slice(0, 4).map(skill => (
        <div key={skill} className={classes.SkillItem}>
          <i style={{ color: "var(--highlight-color)" }} className={"fas fa-check"}/>{skill}
        </div>
      ));
      skillBox = (<div className={classes.SkillsOuter}>
        <div className={classes.SkillsHeader}><i className="fas fa-clipboard-check"/>Skills</div>
        <div className={classes.Skills}>{skillList}</div>
      </div>);
    }

    return (
      <div className={classes.ProfileItem}>
        <div className={classes.Avatar}><img src={avatar} alt="User's avatar"/> </div>
        <div className={classes.Name}>{name}</div>
        <div className={classes.Status}>
          {capitalizeFirstLetter(status)} {!isEmpty(company) ? <span>at {company}</span> : null}
        </div>
        <div className={classes.Location}>{location}</div>
        <div className={classes.LinkToHandle}>
          <Button type={"button"}
            colorType={"highlight"}
            handleClick={this.go.bind(this, `/profile/${handle}`)}>
            <i className="far fa-eye"/>View profile
          </Button>
        </div>
        {skillBox}
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default withRouter(ProfileItem);
