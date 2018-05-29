import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./ProfileGithub.css";
import { isEmpty } from "../../../shared/utils";

class ProfileGithub extends Component {
  state = {
    count: 5,
    sort: "created: asc",
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;
    const { count, sort } = this.state;

    fetch(`/api/profile/github/${username}?per_page=${count}&sort=${sort}`)
      .then(res => res.json())
      .then(data => {
        const dataArray = JSON.parse(String(data));
        this.setState({ repos: dataArray });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    let repoItems;
    if (!isEmpty(repos)) {
      repoItems = repos.map(repo => (
        <div key={repo.id}>
          <Link to={repo.html_url} target={"_blank"}>{repo.name}</Link>
          <div>{repo.description}</div>
          <div>Stars: {repo.stargazers_count}</div>
          <div>Watchers: {repo.watchers_count}</div>
          <div>Forks: {repo.forks_count}</div>
        </div>
      ));
    }

    return (
      <div className={classes.ProfileGithub}>
        <div>Github</div>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
