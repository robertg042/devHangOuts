import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

import classes from "./Redirect.css";

class Redirect extends Component {
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
      if (this.props.location && this.props.location.state) {
        this.props.history.push(this.props.location.state.url);
      } else if (this.props.url) {
        this.props.history.push(this.props.url);
      }

      return;
    }
    this.setState(prevState => {
      return {
        secondsLeft: prevState.secondsLeft - 1
      };
    });
  };

  render() {
    let path = null;
    let msg = null;
    if (this.props.location && this.props.location.state) {
      path = this.props.location.state.to;
      msg = this.props.location.state.message || "Redirecting...";
    } else if (this.props.to) {
      path = this.props.to;
      msg = this.props.message || "Redirecting...";
    }

    return (
      <div className={classes.RedirectWrapper}>
        <div className={classes.Redirect}>
          <div className={classes.InfoHeader}>{msg}</div>
          <div className={[classes.InfoRedirect, "lato300i"].join(" ")}>Redirecting to {path} in...</div>
          <div className={classes.Counter}>{this.state.secondsLeft}</div>
        </div>
      </div>
    );
  }
}

Redirect.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

Redirect.defaultProps = {
  children: null
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(actionCreators.logoutUser())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Redirect));
