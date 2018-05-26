import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser();
    const location = {
      message: "You have been successfully logged out.",
      to: "home page",
      url: "/"
    };
    this.props.history.replace("/redirect", location);
  }


  render() {
    return (
      <div />
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    // clearCurrentProfile: () => dispatch(actionCreators.clearCurrentProfile()),
    logoutUser: () => dispatch(actionCreators.logoutUser())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Logout));
