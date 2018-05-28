import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import classes from "./ExperienceTable.css";
import Button from "../../UI/Button/Button";

class ExperienceTable extends Component {
  render() {
    const expItems = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td><Moment format={"LL"}>{exp.from}</Moment> - {exp.to ? <Moment format={"LL"}>{exp.to}</Moment> : "Current"}</td>
        <td><Button handleClick={() => this.props.handleDeleteExperience(exp._id)} type={"button"} colorType={"danger"}><i className="fas fa-trash-alt"/></Button></td>
      </tr>
    ));

    return (
      <div className={classes.ExperienceTableWrapper}>
        <h4>Experience</h4>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            {expItems}
          </tbody>
        </table>
      </div>
    );
  }
}

ExperienceTable.propTypes = {
  experience: PropTypes.array.isRequired,
  handleDeleteExperience: PropTypes.func.isRequired
};

export default ExperienceTable;
