import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./TextInput.css";

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      labelClasses: [classes.Label, classes.LabelLow],
      value: this.props.value
    };

    if (this.state.value) {
      this.state.labelClasses = [classes.Label, classes.LabelHigh];
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.setLabelState(event.target.value !== "");
    this.props.handleChange(event.target.value, this.props.name);
    // this.props.updateParent(this.props.name, event.target.value);
  };

  handleFocus = () => {
    this.setLabelState(true);
  };

  handleBlur = () => {
    this.setLabelState(this.state.value);
  };

  setLabelState = condition => {
    if (condition) {
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
            name={this.props.name}
            onChange={event => this.handleChange(event)}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={this.state.value}
            disabled={this.props.disabled}
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <label
            className={this.state.labelClasses.join(" ")}
            htmlFor={this.state.id}
          >
            {labelText}
          </label>
        </div>
        {this.props.error && (
          <div className={classes.ErrorFeedback}>{this.props.error}</div>
        )}
        {this.props.info && (
          <small className={classes.InfoTip}>{this.props.info}</small>
        )}
      </div>
    );
  }
}

TextInput.propTypes = {
  inputType: PropTypes.oneOf(["text", "email", "password"]),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  value: PropTypes.string.isRequired
};

TextInput.defaultProps = {
  inputType: "text",
  info: "",
  error: "",
  isRequired: false,
  disabled: false,
  handleChange: null
};

export default TextInput;
