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
  handleClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  type: "submit",
  colorType: "primary"
};

export default Button;
