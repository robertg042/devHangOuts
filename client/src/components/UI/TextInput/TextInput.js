import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./TextInput.css";

class TextInput extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      let labelClasses = [classes.Label, classes.LabelLow];
      if (nextProps.value !== "") {
        labelClasses = [classes.Label, classes.LabelHigh];
      }

      return { ...prevState, value: nextProps.value, labelClasses: labelClasses };
    }

    return null;
  }

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

  inputToFocus = React.createRef();

  // called in parent component through ref
  focus = () => {
    this.inputToFocus.current.focus();
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.setLabelState(event.target.value !== "");
    this.props.handleChange(event.target.value, this.props.name);
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
    const { labelText, isRequired, icon } = this.props;
    let changedLabelText = labelText;
    if (isRequired) {
      changedLabelText = `*${changedLabelText}`;
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
            ref={this.inputToFocus}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <label
            className={this.state.labelClasses.join(" ")}
            htmlFor={this.state.id}
          >
            {icon ? <i className={icon}/> : null}
            {changedLabelText}
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
  icon: PropTypes.string,
  value: PropTypes.string.isRequired
};

TextInput.defaultProps = {
  inputType: "text",
  info: "",
  error: "",
  isRequired: false,
  disabled: false,
  handleChange: null,
  icon: ""
};

export default TextInput;
