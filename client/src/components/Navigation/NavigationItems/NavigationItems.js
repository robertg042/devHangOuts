import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationItems extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth;
    let links = (
      <Fragment>
        <NavigationItem exact linkUrl={"/signup"}>
          Sign up
        </NavigationItem>
        <NavigationItem exact linkUrl={"/login"}>
          Log in
        </NavigationItem>
      </Fragment>
    );
    if (isAuthenticated) {
      links = (
        <Fragment>
          <NavigationItem exact linkUrl={"/dashboard"}>
            Dashboard
          </NavigationItem>
          <NavigationItem exact linkUrl={"/logout"}>
            <img src={user.avatar} alt="User's avatar. Part of logout link."/>Log out
          </NavigationItem>
        </Fragment>
      );
    }

    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem exact linkUrl={"/developers"} floatLeft>
          Developers
        </NavigationItem>
        {links}
      </ul>
    );
  }
}

NavigationItems.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(NavigationItems);
