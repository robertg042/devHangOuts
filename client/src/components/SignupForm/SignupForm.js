import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./SignupForm.css";
import TextInput from "../UI/TextInput/TextInput";
import Button from "../UI/Button/Button";

class SignupForm extends Component {
  state = {
    form: {
      name: {
        name: "name",
        inputType: "text",
        labelText:
          "Name Bardzo długi bardzo długi Bardzo długi bardzo długi Bardzo długi bardzo długi",
        info: "",
        error: "",
        disabled: false,
        isRequired: true,
        value: ""
      },
      email: {
        name: "email",
        inputType: "email",
        labelText: "Email address",
        info: "Info 3",
        error: "",
        disabled: false,
        isRequired: true,
        value: ""
      },
      password: {
        name: "password",
        inputType: "password",
        labelText: "Password",
        info: "",
        error: "Error 2",
        disabled: false,
        isRequired: true,
        value: ""
      },
      passwordRepeat: {
        name: "passwordRepeat",
        inputType: "password",
        labelText: "Confirm password",
        info: "Info 1",
        error: "Error 1",
        disabled: true,
        isRequired: true,
        value: ""
      }
    }
  };

  handleChange = event => {
    // eslint-disable-next-line
    const updatedForm = { ...this.state.form };
    const updatedElement = {
      ...updatedForm[event.target.name]
    };
    updatedElement.value = event.target.value;
    updatedForm[event.target.name] = updatedElement;
    this.setState({ form: updatedForm });
  };

  handleSubmit = () => {};

  checkForRequired = () => {
    const arrayOfTruth = Object.keys(this.state.form)
      .map(key => {
        return this.state.form[key].isRequired;
      })
      .find(element => element === true);

    return arrayOfTruth || false;
  };

  render() {
    let requiredInfoTip = null;
    if (this.props.hasRequiredFields) {
      requiredInfoTip = <div className={classes.InfoTip}>* field required</div>;
    }

    console.log(`Check: ${this.checkForRequired()}`);

    const formElements = [];
    for (const key in this.state.form) {
      if (Object.prototype.hasOwnProperty.call(this.state.form, key)) {
        formElements.push({
          id: key,
          config: this.state.form[key]
        });
      }
    }

    return (
      <div className={classes.SignupFormWrapper}>
        <div className={classes.SignupForm}>
          <div className={classes.Title}>Sign up</div>
          {formElements.map(element => (
            <TextInput
              key={element.id}
              name={element.config.name}
              inputType={element.config.inputType}
              labelText={element.config.labelText}
              info={element.config.info}
              error={element.config.error}
              disabled={element.config.disabled}
              value={element.config.value}
              handleChange={event => this.handleChange(event)}
              isRequired={element.config.isRequired}
            />
          ))}
          {requiredInfoTip}
        </div>
        <Button
          handleClick={this.handleSubmit}
          type={"submit"}
          colorType={"primary"}
        >
          Sign up
        </Button>
      </div>
    );
  }
}

SignupForm.propTypes = {
  hasRequiredFields: PropTypes.bool.isRequired
};

export default SignupForm;
