import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./SelectInput.css";

class SelectInput extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return { ...prevState, value: nextProps.value };
    }

    return null;
  }

  state = {
    id: this.props.id,
    value: this.props.defaultOption.value
  };

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
    const { defaultOption, options } = this.props;

    const selectOptions = options.map(option => (
      <option key={option.label} value={option.value}>
        {option.label}
      </option>
    ));

    const elementClasses = [classes.Element];
    if (this.props.error) {
      elementClasses.push(classes.Invalid);
    }

    return (
      <div className={classes.SelectInput}>
        <select
          className={elementClasses.join(" ")}
          id={this.state.id}
          name={this.props.name}
          onChange={event => this.handleChange(event)}
          value={this.state.value}
          disabled={this.props.disabled}
          ref={this.inputToFocus}
        >
          <option className={classes.displayNone} disabled value={defaultOption.value}>{defaultOption.label}</option>
          {selectOptions}
        </select>
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

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  defaultOption: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
};

SelectInput.defaultProps = {
  info: "",
  error: "",
  disabled: false,
  handleChange: null
};

export default SelectInput;
