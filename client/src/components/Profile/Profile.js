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

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  go = path => {
    this.props.history.push(path);
  };

  render() {
    const { profile, loading } = this.props;

    let profileContents;

    if (profile === null || loading) {
      profileContents = <Spinner/>;
    } else {
      profileContents = (
        <div className={classes.ProfileWrapper}>
          <div className={classes.AlignStart}>
            <Button type={"button"} colorType={"secondary"} handleClick={this.go.bind(this, "/dashboard")}>
              <i className={"fas fa-angle-left"}/>
              Go back
            </Button>
          </div>
          <div className={classes.Profile}>
            <div className={classes.Header}>
              <ProfileHeader profile={profile}/>
            </div>
            <div className={classes.About}>
              <ProfileAbout profile={profile}/>
            </div>
            <div className={classes.Experience}>
              {profile.experience ? <ProfileCreds experience={profile.experience}/> : null}
            </div>
            <div className={classes.Education}>
              {profile.education ? <ProfileCreds education={profile.education}/> : null}
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
  // serverSideErrors: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
  // clearErrors: PropTypes.func.isRequired,
  // createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    // serverSideErrors: state.serverErrors.errors,
    loading: state.profile.loading,
    profile: state.profile.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getCurrentProfile: () => dispatch(actionCreators.getCurrentProfile()),
    getProfileByHandle: handle => dispatch(actionCreators.getProfileByHandle(handle))
    // clearErrors: () => dispatch(actionCreators.clearServerSideErrors()),
    // createProfile: (profileData, history) => dispatch(actionCreators.createProfile(profileData, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
