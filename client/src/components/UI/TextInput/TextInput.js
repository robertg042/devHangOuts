import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./TextInput.css";
import { makeId } from "../../../shared/utils";

class TextInput extends Component {
  state = {
    id: "",
    labelHigh: false,
    labelClasses: [classes.Label, classes.LabelLow],
    value: ""
  };

  componentWillMount() {
    if (this.state.id === "") {
      let inputId = this.props.name;
      inputId += `_${makeId()}`;
      this.setState({ id: inputId });
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    if (event.target.value === "") {
      this.setState({ labelHigh: false });
    } else {
      this.setState({ labelHigh: true });
    }
    // this.props.handleChange(event);
  };

  handleFocus = () => {
    this.setState({ labelClasses: [classes.Label, classes.LabelHigh] });
  };

  handleBlur = () => {
    if (this.state.labelHigh) {
      this.setState({ labelClasses: [classes.Label, classes.LabelHigh] });
    } else {
      this.setState({ labelClasses: [classes.Label, classes.LabelLow] });
    }
  };

  render() {
    let { labelText } = this.props;
    if (this.props.isRequired) {
      labelText += "*";
    }

    const elementClasses = [classes.Element];
    if (this.props.error) {
      elementClasses.push(classes.Invalid);
    }


    return (
      <div className={classes.TextInput}>
        <div className={classes.ElementOuter}>
          <input
            className={elementClasses.join(" ")}
            id={this.state.id}
            type={this.props.inputType}
            onChange={event => this.handleChange(event)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={this.state.value}
            disabled={this.props.disabled}
          />
          <label
            className={this.state.labelClasses.join(" ")}
            htmlFor={this.state.id}
          >
            {labelText}
          </label>
        </div>
        {this.props.error && <div className={classes.ErrorFeedback}>{this.props.error}</div>}
        {this.props.info && <div className={classes.InfoTip}>{this.props.info}</div>}
      </div>
    );
  }
}

TextInput.propTypes = {
  inputType: PropTypes.oneOf(["text", "email", "password"]),
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired
  // handleChange: PropTypes.func.isRequired
};

TextInput.defaultProps = {
  inputType: "text"
};

export default TextInput;
