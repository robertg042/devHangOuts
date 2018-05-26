import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./Dashboard.css";
import * as actionCreators from "../../store/actions/index";

class dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div className={classes.dashboard}>
        dashboard
      </div>
    );
  }
}

dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired
};

// const mapStateToProps = state => {
//   return {
//     // prop: state.prop,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    getCurrentProfile: () => dispatch(actionCreators.getCurrentProfile())
  };
};

export default connect(null, mapDispatchToProps)(dashboard);
