import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import classes from "./Dashboard.css";
import * as actionCreators from "../../store/actions/index";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import DashboardActions from "./DashboardActions/DashboardActions";

class dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleClick = () => {
    this.props.history.push("/create-profile");
  };

  handleDeleteAccount = () => {
    console.log("hello");
    this.props.deleteAccount(this.props.history);
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let content = null;

    if (profile === null || loading) {
      content = <Spinner/>;
    } else {
      if (Object.keys(profile).length > 0) {
        // profile exists
        content = (<div>
          <p>Hi, <Link to={`/profile/${profile.handle}`}>{user.name}</Link> <i className={"fas fa-heart"}/></p>
          <DashboardActions handleDeleteAccount={this.handleDeleteAccount}/>
        </div>);
      } else {
        // there's no profile for logged in user
        content = (
          <div>
            <p>Hi, {user.name} <i className={"fas fa-heart"}/></p>
            <p>You have no profile yet.</p>
            <p><i className={"fas fa-fire"}/> Please, create one <i className={"fas fa-fire"}/></p>
            <Button colorType={"secondary"} handleClick={this.handleClick}>Create profile</Button>
          </div>
        );
      }
    }

    return (
      <div className={classes.DashboardWrapper}>
        <div className={classes.Dashboard}>
          {content}
        </div>
      </div>
    );
  }
}

dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentProfile: () => dispatch(actionCreators.getCurrentProfile()),
    deleteAccount: history => dispatch(actionCreators.deleteAccount(history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(dashboard));
