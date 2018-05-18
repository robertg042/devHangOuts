import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./TextInput.css";
import { makeId } from "../../../shared/utils";
import * as actionCreators from "../../../store/actions";

class TextInput extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // if (nextProps.name === "name") {
    //   console.log("nextprops:");
    //   console.log(nextProps);
    //   console.log("prevstate");
    //   console.log(prevState);
    //
    //   return {
    //     ...prevState,
    //     value: nextProps.nameValue
    //   };
    // }

    switch (nextProps.name) {
      case "name":
        return {
          ...prevState,
          value: nextProps.nameValue
        };
      case "email":
        return {
          ...prevState,
          value: nextProps.emailValue
        };
      case "password":
        return {
          ...prevState,
          value: nextProps.passwordValue
        };
      case "passwordRepeat":
        return {
          ...prevState,
          value: nextProps.passwordRepeatValue
        };
      default:
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      id: `${props.name}_${makeId()}`,
      labelClasses: [classes.Label, classes.LabelLow],
      value: ""
    };
    switch (this.props.name) {
      case "name":
        this.state.value = this.props.nameValue;
        break;
      case "email":
        this.state.value = this.props.emailValue;
        break;
      case "password":
        this.state.value = this.props.passwordValue;
        break;
      case "passwordRepeat":
        this.state.value = this.props.passwordRepeatValue;
        break;
      default:
    }
    if (this.state.value) {
      this.state.labelClasses = [classes.Label, classes.LabelHigh];
    }
  }

  componentWillUnmount() {
    // switch (this.props.name) {
    //   case "name":
    //     this.props.saveNameValue(this.state.value);
    //     break;
    //   case "email":
    //     this.props.saveEmailValue(this.state.value);
    //     break;
    //   case "password":
    //     this.props.savePasswordValue(this.state.value);
    //     break;
    //   case "passwordRepeat":
    //     this.props.savePasswordRepeatValue(this.state.value);
    //     break;
    //   default:
    // }
  }

  handleChange = event => {
    switch (this.props.name) {
      case "name":
        this.props.saveNameValue(event.target.value);
        break;
      case "email":
        this.props.saveEmailValue(event.target.value);
        break;
      case "password":
        this.props.savePasswordValue(event.target.value);
        break;
      case "passwordRepeat":
        this.props.savePasswordRepeatValue(event.target.value);
        break;
      default:
    }

    this.setState({ value: event.target.value });
    this.setLabelState(event.target.value !== "");
    this.props.updateParent(this.props.name, event.target.value);

    // this.props.handleChange(event);
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
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool
  // handleChange: PropTypes.func
};

TextInput.defaultProps = {
  inputType: "text",
  info: "",
  error: "",
  isRequired: false,
  disabled: false,
  handleChange: null
};

const mapStateToProps = state => {
  return {
    nameValue: state.signup.name,
    emailValue: state.signup.email,
    passwordValue: state.signup.password,
    passwordRepeatValue: state.signup.passwordRepeat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveNameValue: value => dispatch(actionCreators.saveNameValue(value)),
    saveEmailValue: value => dispatch(actionCreators.saveEmailValue(value)),
    savePasswordValue: value => dispatch(actionCreators.savePasswordValue(value)),
    savePasswordRepeatValue: value => dispatch(actionCreators.savePasswordRepeatValue(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
