import React, { Component } from "react";

import classes from "./LoginForm.css";
import TextInput from "../UI/TextInput/TextInput";
import Button from "../UI/Button/Button";
import { makeId } from "../../shared/utils";

class LoginForm extends Component {
  state = {
    form: {
      email: {
        name: "email",
        inputType: "email",
        labelText: "Email address",
        info: "",
        error: "",
        value: ""
      },
      password: {
        name: "password",
        inputType: "password",
        labelText: "Password",
        info: "",
        error: "",
        value: ""
      }
    },
    formId: ""
  };

  componentWillMount() {
    if (this.state.formId === "") {
      let formId = "loginForm";
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

    const usercredentials = {
      email: this.state.form.email.value,
      password: this.state.form.password.value
    };

    console.log(usercredentials);
  };

  render() {
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
      <div className={classes.LoginFormWrapper}>
        <form
          id={this.state.formId}
          onSubmit={this.handleSubmit.bind(this, event)}
          className={classes.LoginForm}
        >
          <div className={classes.Title}>Log in</div>
          {formElements.map(element => (
            <TextInput
              key={element.id}
              name={element.config.name}
              inputType={element.config.inputType}
              labelText={element.config.labelText}
              info={element.config.info}
              error={element.config.error}
              value={element.config.value}
              handleChange={event => this.handleChange(event)}
            />
          ))}
        </form>
        <Button
          form={this.state.formId}
          handleClick={this.handleSubmit}
          type={"submit"}
          colorType={"primary"}
        >
          Log in
        </Button>
      </div>
    );
  }
}

export default LoginForm;
