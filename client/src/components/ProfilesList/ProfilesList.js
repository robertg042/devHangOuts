import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./ProfilesList.css";
import * as actionCreators from "../../store/actions";
import ProfileItem from "./ProfileItem/ProfileItem";
import Spinner from "../UI/Spinner/Spinner";

class ProfilesList extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner/>;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile}/>
        ));
      } else {
        profileItems = <h4>No profiles found</h4>;
      }
    }

    return (
      <div className={classes.ProfilesListWrapper}>
        <div className={classes.ProfilesList}>
          <div className={classes.Title}>Developer profiles</div>
          <div className={classes.SubTitle}>
            <p>
              Browse through developer&apos;s profiles
            </p>
          </div>
          {profileItems}
        </div>
      </div>
    );
  }
}

ProfilesList.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfiles: () => dispatch(actionCreators.getProfiles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesList);
