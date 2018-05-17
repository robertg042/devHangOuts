import React, { Component } from "react";

import classes from "./Landing.css";
import Button from "../UI/Button/Button";
import SignupForm from "../SignupForm/SignupForm";

class Landing extends Component {
  state = {
    displayForm: false
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  navigateToSignupForm() {
    this.props.history.push("/signup");
  }

  updateDimensions() {
    if (
      document.documentElement.clientWidth >= 400 &&
      document.documentElement.clientHeight > 360
    ) {
      this.setState({ displayForm: true });
    } else {
      this.setState({ displayForm: false });
    }
  }

  render() {
    let signup = (
      <Button handleClick={this.navigateToSignupForm.bind(this)}>
        Sign up <i className={"far fa-arrow-alt-circle-right"} />
      </Button>
    );

    if (this.state.displayForm) {
      signup = <SignupForm hasRequiredFields />;
    }

    return (
      <div className={classes.Landing}>
        <div className={classes.Overlay} />
        <div className={classes.Content}>
          <div className={classes.Header}>
            <span className={"lato700"}>devHangOuts</span>
          </div>
          <div className={classes.Leading}>
            <span className={"lato400i"}>
              <em className={"lato500"}>THE</em> social site for developers
            </span>
          </div>
          <div className={classes.Signup}>{signup}</div>
        </div>
      </div>
    );
  }
}

export default Landing;
