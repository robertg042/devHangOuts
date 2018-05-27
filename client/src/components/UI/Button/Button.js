import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Button.css";

class Button extends Component {
  render() {
    const buttonClasses = [classes.Button];

    switch (this.props.colorType) {
      case "primary":
        buttonClasses.push(classes.Primary);
        break;
      case "secondary":
        buttonClasses.push(classes.Secondary);
        break;
      case "highlight":
        buttonClasses.push(classes.Highlight);
        break;
      case "danger":
        buttonClasses.push(classes.Danger);
        break;
      default:
        buttonClasses.push(classes.Primary);
    }

    const keysToRemove = ["colorType", "handleClick"];
    const buttonProps = Object.filterKeys(
      this.props,
      key => !keysToRemove.includes(key)
    );

    return (
      <button
        className={buttonClasses.join(" ")}
        {...buttonProps}
        onClick={this.props.handleClick}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  colorType: PropTypes.string,
  form: (props, propName, componentName) => {
    if (!props.form && !props.handleClick) {
      return new Error(
        `One of props 'form' or 'handleClick' is required in '${componentName}'.`
      );
    }
  },
  handleClick: (props, propName, componentName) => {
    if (!props.form && !props.handleClick) {
      return new Error(
        `One of props 'form' or 'handleClick' is required in '${componentName}'.`
      );
    }
  }
};

Button.defaultProps = {
  type: "submit",
  colorType: "primary",
  form: null,
  handleClick: null
};

export default Button;
