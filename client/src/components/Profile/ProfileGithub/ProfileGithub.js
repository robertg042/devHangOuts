import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import KEYS from "../../../../../config/keys";

import classes from "./ProfileGithub.css";

class ProfileGithub extends Component {
  state = {
    clientId: "9fa6f08a5170f9a2eee8",
    clientSecret: "575a9b4bdc26d24149bcb767c9241ef14beaccc7",
    count: 5,
    sort: "created: asc",
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id}>
        <Link to={repo.html_url} target={"_blank"}>{repo.name}</Link>
        <div>{repo.description}</div>
        <div>Stars: {repo.stargazers_count}</div>
        <div>Watchers: {repo.watchers_count}</div>
        <div>Forks: {repo.forks_count}</div>
      </div>
    ));

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
