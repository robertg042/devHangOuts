import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationItems extends Component {
  render() {
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
    if (this.props.isAuthenticated) {
      links = (
        <NavigationItem exact linkUrl={"/logout"}>
          Log out
        </NavigationItem>
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
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(NavigationItems);
