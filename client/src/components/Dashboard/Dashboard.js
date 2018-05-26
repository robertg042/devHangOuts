import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./Dashboard.css";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../UI/Spinner/Spinner";

class dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    // const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let content = null;

    if (profile === null || loading) {
      content = <Spinner/>;
    } else {
      content = <h4>Dashboard</h4>;
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
  // auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentProfile: () => dispatch(actionCreators.getCurrentProfile())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(dashboard);
