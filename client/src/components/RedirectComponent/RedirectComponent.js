import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

import classes from "./RedirectComponent.css";

class RedirectComponent extends Component {
  state = {
    secondsLeft: 5
  };

  componentDidMount() {
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
        this.props.history.replace(this.props.location.state.url);
      } else if (this.props.url) {
        this.props.history.replace(this.props.url);
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
    let noPropsGiven = false;
    if (this.props.location && this.props.location.state) {
      path = this.props.location.state.to;
      msg = this.props.location.state.message || "Redirecting...";
    } else if (this.props.to) {
      path = this.props.to;
      msg = this.props.message || "Redirecting...";
    } else {
      noPropsGiven = true;
    }

    return (
      <div className={classes.RedirectWrapper}>
        {noPropsGiven ? <Redirect to={"/"}/> : null}
        <div className={classes.Redirect}>
          <div className={classes.InfoHeader}>{msg}</div>
          <div className={[classes.InfoRedirect, "lato300i"].join(" ")}>Redirecting to {path} in...</div>
          <div className={classes.Counter}>{this.state.secondsLeft}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(RedirectComponent);
