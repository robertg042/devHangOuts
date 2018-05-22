import React, { Component } from "react";
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
      this.props.history.push(this.props.location.state.url);

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
    if (this.props.location.state) {
      path = this.props.location.state.to;
      msg = this.props.location.state.message;
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

export default connect(null, mapDispatchToProps)(Redirect);
