import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./TextAreaInput.css";

class TextAreaInput extends Component {
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

  componentDidMount() {
    // fix initial height
    this.autoGrow(this.inputToFocus.current);
  }

  inputToFocus = React.createRef();

  // called in parent component through ref
  focus = () => {
    this.inputToFocus.current.focus();
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.setLabelState(event.target.value !== "");
    this.autoGrow(event.target);
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

  autoGrow = element => {
    element.style.height = "5px";
    element.style.height = `${element.scrollHeight}px`;
  };

  render() {
    const { labelText } = this.props;
    let requiredLabelText = labelText;
    if (this.props.isRequired) {
      requiredLabelText = `*${labelText}`;
    }

    const elementClasses = [classes.Element];
    if (this.props.error) {
      elementClasses.push(classes.Invalid);
    }

    return (
      <div className={classes.TextAreaInput}>
        <div className={classes.ElementOuter}>
          <textarea
            className={elementClasses.join(" ")}
            id={this.state.id}
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
            {requiredLabelText}
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

TextAreaInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  value: PropTypes.string.isRequired
};

TextAreaInput.defaultProps = {
  inputType: "text",
  info: "",
  error: "",
  isRequired: false,
  disabled: false,
  handleChange: null
};

export default TextAreaInput;