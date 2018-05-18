import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import classes from "./SignupForm.css";
import TextInput from "../UI/TextInput/TextInput";
import Button from "../UI/Button/Button";
import * as actionCreators from "../../store/actions/index";
import { makeId } from "../../shared/utils";

class SignupForm extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.checkForRequired = this.checkForRequired.bind(this);
    this.state = {
      form: {
        name: {
          name: "name",
          inputType: "text",
          labelText: "Name",
          info: "",
          error: "",
          disabled: false,
          isRequired: true,
          value: this.props.nameValue
        },
        email: {
          name: "email",
          inputType: "email",
          labelText: "Email address",
          info: "",
          error: "",
          disabled: false,
          isRequired: true,
          value: this.props.emailValue
        },
        password: {
          name: "password",
          inputType: "password",
          labelText: "Password",
          info: "",
          error: "",
          disabled: false,
          isRequired: true,
          value: this.props.passwordValue
        },
        passwordRepeat: {
          name: "passwordRepeat",
          inputType: "password",
          labelText: "Confirm password",
          info: "",
          error: "",
          disabled: false,
          isRequired: true,
          value: this.props.passwordRepeatValue
        }
      },
      formId: `signupForm_${makeId()}`,
      displayRequiredInfo: false
    };
    this.state.displayRequiredInfo = this.checkForRequired();
    this.state.form.name.value = this.props.nameValue;
    this.state.form.email.value = this.props.emailValue;
    this.state.form.password.value = this.props.passwordValue;
    this.state.form.passwordRepeat.value = this.props.passwordRepeatValue;
  }

  checkForRequired = () => {
    const atLeastOneRequired = Object.keys(this.state.form)
      .map(key => {
        return this.state.form[key].isRequired;
      })
      .find(element => element === true);

    return atLeastOneRequired || false;
  };


  handleUpdateFromInput = (name, value) => {
    // update form with value received from TextInput
    // eslint-disable-next-line
    const updatedForm = { ...this.state.form };
    updatedForm[name] = {
      ...updatedForm[name],
      value: value
    };
    this.setState({
      form: updatedForm
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: this.state.form.name.value,
      email: this.state.form.email.value,
      password: this.state.form.password.value,
      password2: this.state.form.passwordRepeat.value
    };

    axios
      .post("/api/users/register", newUser)
      .then(response => {
        // this.updateErrors(response.data.errors);
        console.log(response.data);
      })
      .catch(error => {
        this.updateErrors(error.response.data);
      });
  };

  updateErrors = data => {
    // eslint-disable-next-line
    const updatedForm = { ...this.state.form };
    const formKeys = Object.keys(updatedForm);
    // create an array of updated element (with new error messages
    const newElements = formKeys.map(key => {
      const updatedElement = { ...this.state.form[key] };
      if (key !== "passwordRepeat") {
        if (data.hasOwnProperty(key)) {
          // there's an error message that can be displayed
          updatedElement.error = data[key];
        } else {
          // no error message in response: clear message for input in component's state
          updatedElement.error = "";
        }
      } else {
        if (data.hasOwnProperty("password2")) {
          // there's an error message that can be displayed, modify it
          updatedElement.error = data.password2.replace(
            "Password2",
            "Confirm password"
          );
        } else {
          // no error message in response: clear message for input in component's state
          updatedElement.error = "";
        }
      }

      return updatedElement;
    });

    // apply updated elements to copied form object
    formKeys.forEach(key => {
      if (key !== "password2") {
        updatedForm[key] = newElements.find(element => {
          return element.name === key;
        });
      } else {
        updatedForm.passwordRepeat = newElements.find(element => {
          return element.name === "passwordRepeat";
        });
      }
    });

    this.setState({ form: updatedForm });
  };

  render() {
    let requiredInfoTip = null;
    if (this.state.displayRequiredInfo) {
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
          onSubmit={() => this.handleSubmit()}
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
              isRequired={element.config.isRequired}
              updateParent={this.handleUpdateFromInput}
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
    saveNameValue: value => dispatch(actionCreators.saveNameValue(value))
  };
};

// export default SignupForm;
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
