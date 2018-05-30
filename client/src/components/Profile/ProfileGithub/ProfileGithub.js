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
        if (this.guardRef.current) {
          const dataArray = JSON.parse(String(data));
          this.setState({ repos: dataArray });
        }
      })
      .catch(err => console.log(err));
  }

  guardRef = React.createRef();

  render() {
    const { repos } = this.state;

    let repoItems;
    if (!isEmpty(repos)) {
      repoItems = repos.map(repo => (
        <div className={classes.Repo} key={repo.id}>
          <Link className={classes.NameLink} to={repo.html_url} target={"_blank"}>{repo.name}<i className="fas fa-external-link-alt"/></Link>
          <div className={classes.Description}>{repo.description || "No description"}</div>
          <div className={classes.Badges}>
            <div className={classes.Badge}><i className={"fas fa-star"}/>Stars: {repo.stargazers_count}</div>
            <div className={classes.Badge}><i className={"fas fa-eye"}/>Watchers: {repo.watchers_count}</div>
            <div className={classes.Badge}><i className={"fas fa-code-branch"}/>Forks: {repo.forks_count}</div>
          </div>
        </div>
      ));
    }

    return (
      <div ref={this.guardRef} className={classes.ProfileGithub}>
        <div className={classes.Header}><i className="fab fa-github-alt"/>Latest github repositories</div>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
