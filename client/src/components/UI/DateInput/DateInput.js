import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./DateInput.css";

class DateInput extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return { ...prevState, value: nextProps.value };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      value: this.props.value
    };
  }

  inputToFocus = React.createRef();

  // called in parent component through ref
  focus = () => {
    this.inputToFocus.current.focus();
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.handleChange(event.target.value, this.props.name);
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
      <div className={classes.DateInput}>
        <div className={classes.ElementOuter}>
          <input
            className={elementClasses.join(" ")}
            id={this.state.id}
            type={this.props.inputType}
            name={this.props.name}
            onChange={event => this.handleChange(event)}
            value={this.state.value}
            max={this.props.max}
            disabled={this.props.disabled}
            ref={this.inputToFocus}
          />
          <label
            className={classes.Label}
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

DateInput.propTypes = {
  inputType: PropTypes.oneOf(["date"]),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  icon: PropTypes.string,
  value: PropTypes.string.isRequired,
  max: PropTypes.string
};

DateInput.defaultProps = {
  inputType: "date",
  info: "",
  error: "",
  isRequired: false,
  disabled: false,
  handleChange: null,
  icon: "",
  max: ""
};

export default DateInput;
