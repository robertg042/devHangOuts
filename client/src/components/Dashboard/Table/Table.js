import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import classes from "./Table.css";
import Button from "../../UI/Button/Button";

class Table extends Component {
  render() {
    const { headers, rows, handleDeleteItem, title } = this.props;
    const headerList = headers.map(header => (
      <th key={header}>{header}</th>
    ));
    let items = null;
    if (title === "Experience") {
      items = rows.map(item => {
        return (
          <tr key={item._id}>
            <td>{item.company}</td>
            <td>{item.title}</td>
            <td>
              <Moment
                format={"LL"}>{item.from}
              </Moment> - {item.to ? <Moment
                format={"LL"}>{item.to}
              </Moment> : "Current"}
            </td>
            <td>
              <Button
                handleClick={() => handleDeleteItem(item._id)}
                type={"button"}
                colorType={"danger"}>
                <i className="fas fa-trash-alt"/>
              </Button>
            </td>
          </tr>
        );
      });
    } else if (title === "Education") {
      items = rows.map(item => {
        return (
          <tr key={item._id}>
            <td>{item.school}</td>
            <td>{item.degree}</td>
            <td>{item.fieldofstudy}</td>
            <td>
              <Moment
                format={"LL"}>{item.from}
              </Moment> - {item.to ? <Moment
                format={"LL"}>{item.to}
              </Moment> : "Current"}
            </td>
            <td>
              <Button
                handleClick={() => handleDeleteItem(item._id)}
                type={"button"}
                colorType={"danger"}>
                <i className="fas fa-trash-alt"/>
              </Button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div className={classes.TableWrapper}>
        <h4>{title}</h4>
        <table>
          <thead>
            <tr>
              {headerList}
              <th/>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  handleDeleteItem: PropTypes.func.isRequired
};

export default Table;
