import React, { Component } from "react";

import classes from "./SignupForm.css";
import TextInput from "../UI/TextInput/TextInput";
import Button from "../UI/Button/Button";
import { makeId } from "../../shared/utils";

class SignupForm extends Component {
  state = {
    form: {
      name: {
        name: "name",
        inputType: "text",
        labelText: "Name",
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
        info: "",
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
        error: "",
        disabled: false,
        isRequired: true,
        value: ""
      },
      passwordRepeat: {
        name: "passwordRepeat",
        inputType: "password",
        labelText: "Confirm password",
        info: "",
        error: "",
        disabled: false,
        isRequired: true,
        value: ""
      }
    },
    formId: ""
  };

  componentWillMount() {
    if (this.state.formId === "") {
      let formId = "signupForm";
      formId += `_${makeId()}`;
      this.setState({ formId: formId });
    }
  }

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

  handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: this.state.form.name.value,
      email: this.state.form.email.value,
      password: this.state.form.password.value,
      password2: this.state.form.passwordRepeat.value
    };

    console.log(newUser);
  };

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
    if (this.checkForRequired()) {
      requiredInfoTip = <div className={classes.InfoTip}>* field required</div>;
    }

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
        <form
          id={this.state.formId}
          onSubmit={this.handleSubmit.bind(this, event)}
          className={classes.SignupForm}
        >
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
        </form>
        <Button
          form={this.state.formId}
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

export default SignupForm;
