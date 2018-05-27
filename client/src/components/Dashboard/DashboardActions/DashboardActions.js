import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "../../UI/Button/Button";

class DashboardActions extends Component {
  go = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div>
        <p>
          <Button type={"button"} colorType={"secondary"} handleClick={this.go.bind(this, "/edit-profile")}>
            <i className={"fas fa-user-circle"}/>
            Edit profile
          </Button>
          <Button type={"button"} colorType={"secondary"} handleClick={this.go.bind(this, "/add-experience")}>
            <i className={"fab fa-black-tie"}/>
            Add experience
          </Button>
          <Button type={"button"} colorType={"secondary"} handleClick={this.go.bind(this, "/add-education")}>
            <i className={"fas fa-graduation-cap"}/>
            Add education
          </Button>
        </p>
        <p>
          <Button type={"button"} colorType={"danger"} handleClick={this.props.handleDeleteAccount}>
            <i className={"fas fa-exclamation-triangle"}/>
            Delete Account
          </Button>
        </p>
      </div>
    );
  }
}

DashboardActions.propTypes = {
  handleDeleteAccount: PropTypes.func.isRequired
};

export default withRouter(DashboardActions);
