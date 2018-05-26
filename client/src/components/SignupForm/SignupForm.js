import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./SignupForm.css";
import TextInput from "../UI/TextInput/TextInput";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions/index";
import { makeId, updateErrors } from "../../shared/utils";

class SignupForm extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.serverSideErrors) {
      return updateErrors(nextProps, prevState);
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.checkForRequired = this.checkForRequired.bind(this);
    this.state = {
      form: {
        name: {
          id: `name_${makeId()}`,
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
          id: `email_${makeId()}`,
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
          id: `password_${makeId()}`,
          name: "password",
          inputType: "password",
          labelText: "Password",
          info: "",
          error: "",
          disabled: false,
          isRequired: true,
          value: this.props.passwordValue
        },
        password2: {
          id: `password2_${makeId()}`,
          name: "password2",
          inputType: "password",
          labelText: "Confirm password",
          info: "",
          error: "",
          disabled: false,
          isRequired: true,
          value: this.props.password2Value
        }
      },
      formId: `signupForm_${makeId()}`,
      displayRequiredInfo: false
    };
    this.state.displayRequiredInfo = this.checkForRequired();
    this.state.form.name.value = this.props.nameValue;
    this.state.form.email.value = this.props.emailValue;
    this.state.form.password.value = this.props.passwordValue;
    this.state.form.password2.value = this.props.password2Value;
    this.state.form.name.error = this.props.serverSideErrors.name;
    this.state.form.email.error = this.props.serverSideErrors.email;
    this.state.form.password.error = this.props.serverSideErrors.password;
    this.state.form.password2.error = this.props.serverSideErrors.password2;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  componentWillUnmount() {
    if (this.props.serverSideErrors) {
      this.props.clearErrors();
    }
  }

  inputRef = React.createRef();

  checkForRequired = () => {
    const atLeastOneRequired = Object.keys(this.state.form)
      .map(key => {
        return this.state.form[key].isRequired;
      })
      .find(element => element === true);

    return atLeastOneRequired || false;
  };

  handleChange = (value, name) => {
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

    // update redux state
    switch (name) {
      case "name":
        this.props.saveNameValue(value);
        break;
      case "email":
        this.props.saveEmailValue(value);
        break;
      case "password":
        this.props.savePasswordValue(value);
        break;
      case "password2":
        this.props.savePassword2Value(value);
        break;
      default:
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: this.state.form.name.value,
      email: this.state.form.email.value,
      password: this.state.form.password.value,
      password2: this.state.form.password2.value
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    let requiredInfoTip = null;
    if (this.state.displayRequiredInfo) {
      requiredInfoTip = <div className={classes.InfoTip}>* field required</div>;
    }

    const formElements = [];
    for (const key in this.state.form) {
      if (Object.prototype.hasOwnProperty.call(this.state.form, key)) {
        const serverSideError = this.props.serverSideErrors[key] || "";
        formElements.push({
          ...this.state.form[key],
          errors: serverSideError
        });
      }
    }

    return (
      <div className={classes.SignupFormWrapper}>
        <div className={classes.Title}>Sign up</div>
        <form
          id={this.state.formId}
          onSubmit={() => this.handleSubmit()}
          className={classes.SignupForm}
        >
          {formElements.map(element => {
            return (<TextInput
              key={element.id}
              id={element.id}
              name={element.name}
              ref={element.name === "name" ? this.inputRef : null}
              inputType={element.inputType}
              labelText={element.labelText}
              info={element.info}
              error={element.error}
              value={element.value}
              disabled={element.disabled}
              isRequired={element.isRequired}
              handleChange={this.handleChange}
            />);
          })}
          {requiredInfoTip}
        </form>
        {this.props.loading ? <Spinner/> : <Button
          form={this.state.formId}
          handleClick={this.handleSubmit}
          type={"submit"}
          colorType={"primary"}
        >
          Sign up
        </Button>}
      </div>
    );
  }
}

SignupForm.propTypes = {
  nameValue: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  password2Value: PropTypes.string.isRequired,
  serverSideErrors: PropTypes.object.isRequired,
  saveNameValue: PropTypes.func.isRequired,
  saveEmailValue: PropTypes.func.isRequired,
  savePasswordValue: PropTypes.func.isRequired,
  savePassword2Value: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    nameValue: state.signup.name,
    emailValue: state.signup.email,
    passwordValue: state.signup.password,
    password2Value: state.signup.password2,
    serverSideErrors: state.serverErrors.errors,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveNameValue: value => dispatch(actionCreators.saveNameValue(value)),
    saveEmailValue: value => dispatch(actionCreators.saveEmailValue(value)),
    savePasswordValue: value => dispatch(actionCreators.savePasswordValue(value)),
    savePassword2Value: value => dispatch(actionCreators.savePassword2Value(value)),
    registerUser: (userData, history) => dispatch(actionCreators.registerUser(userData, history)),
    clearErrors: () => dispatch(actionCreators.clearServerSideErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignupForm));

