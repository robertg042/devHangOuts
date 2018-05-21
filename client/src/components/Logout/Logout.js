import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

import classes from "./Logout.css";

class Logout extends Component {
  state = {
    secondsLeft: 5
  };

  componentDidMount() {
    this.props.logoutUser();
    this.timer = setInterval(() => this.countDown(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer = null;

  countDown = () => {
    if (this.state.secondsLeft === 1) {
      clearInterval(this.timer);
      this.props.history.push("/");

      return;
    }
    this.setState(prevState => {
      return {
        secondsLeft: prevState.secondsLeft - 1
      };
    });
  };

  render() {
    return (
      <div className={classes.LogoutWrapper}>
        <div className={classes.Logout}>
          <div className={classes.InfoHeader}>You have been successfully logged out <i className="far fa-smile"/></div>
          <div className={[classes.InfoRedirect, "lato300i"].join(" ")}>Redirecting to home page in...</div>
          <div className={classes.Counter}>{this.state.secondsLeft}</div>
        </div>
      </div>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(actionCreators.logoutUser())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
