import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import classes from "./ProfileHeader.css";
import { isEmpty, capitalizeFirstLetter } from "../../../shared/utils";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    const { user, status, location, company } = profile;
    const { avatar, name } = user;

    const socialKeys = ["website", "twitter", "facebook", "linkedin", "youtube", "instagram"];
    const reducer = (acc, curr) => {
      // eslint-disable-next-line
      acc[curr[0]] = curr[1];

      return acc;
    };
    const socialObjects = socialKeys
      .filter(social => (
        !!profile[social]
      ))
      .map(key => (
        [ key, profile[key] ]
      ))
      .reduce(reducer, {});

    return (
      <div className={classes.ProfileHeader}>
        <div className={classes.Avatar}><img src={avatar} alt="User's avatar"/></div>
        <div className={classes.Name}>{name}</div>
        <div className={classes.Status}>
          {capitalizeFirstLetter(status)} {!isEmpty(company) ? (
            <Fragment>
              <span className={classes.Smaller}>at</span><span> {company}</span>
            </Fragment>
          ) : null}
        </div>
        {!isEmpty(location) ? <div className={classes.Location}>{location}</div> : null}
        {Object.keys(socialObjects).length > 0 ? <div className={classes.SocialWrapper}>
          {socialObjects.website ? <a className={classes.SocialItem} href={socialObjects.website} target={"_blank"}><i className={"fas fa-globe"}/></a> : null}
          {socialObjects.twitter ? <a className={classes.SocialItem} href={socialObjects.twitter} target={"_blank"}><i className={"fab fa-twitter"}/></a> : null}
          {socialObjects.facebook ? <a className={classes.SocialItem} href={socialObjects.facebook} target={"_blank"}><i className={"fab fa-facebook"}/></a> : null}
          {socialObjects.linkedin ? <a className={classes.SocialItem} href={socialObjects.linkedin} target={"_blank"}><i className={"fab fa-linkedin"}/></a> : null}
          {socialObjects.youtube ? <a className={classes.SocialItem} href={socialObjects.youtube} target={"_blank"}><i className={"fab fa-youtube"}/></a> : null}
          {socialObjects.instagram ? <a className={classes.SocialItem} href={socialObjects.instagram} target={"_blank"}><i className={"fab fa-instagram"}/></a> : null}
        </div> : null}
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
