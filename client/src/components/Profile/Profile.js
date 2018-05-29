import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Profile.css";
import * as actionCreators from "../../store/actions";
import PropTypes from "prop-types";
import ProfileAbout from "./ProfileAbout/ProfileAbout";
import ProfileCreds from "./ProfileCreds/ProfileCreds";
import ProfileGithub from "./ProfileGithub/ProfileGithub";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import { dynamicSort } from "../../shared/utils";

class Profile extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.showBackButton && nextProps.history.action === "PUSH") {
      return { ...prevState, showBackButton: true };
    }

    return null;
  }

  state = {
    showBackButton: false
  };

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading, history } = this.props;

    let profileContents;

    if (profile === null || loading) {
      profileContents = <Spinner/>;
    } else {
      profileContents = (
        <div className={classes.ProfileWrapper}>
          {this.state.showBackButton ? <div className={classes.AlignStart}>
            <Button type={"button"} colorType={"secondary"} handleClick={history.goBack}>
              <i className={"fas fa-angle-left"}/>
              Go back
            </Button>
          </div> : null}
          <div className={classes.Profile}>
            <div className={classes.Header}>
              <ProfileHeader profile={profile}/>
            </div>
            <div className={classes.About}>
              <ProfileAbout profile={profile}/>
            </div>
            <div className={classes.Experience}>
              {profile.experience ? <ProfileCreds experience={profile.experience.sort(dynamicSort("-from"))}/> : null}
            </div>
            <div className={classes.Education}>
              {profile.education ? <ProfileCreds education={profile.education.sort(dynamicSort("-from"))}/> : null}
            </div>
            <div className={classes.Github}>
              <ProfileGithub profile={profile}/>
            </div>
          </div>
        </div>);
    }

    return profileContents;
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    loading: state.profile.loading,
    profile: state.profile.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileByHandle: handle => dispatch(actionCreators.getProfileByHandle(handle))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
