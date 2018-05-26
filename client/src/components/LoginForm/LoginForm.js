import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./LoginForm.css";
import * as actionCreators from "../../store/actions";
import TextInput from "../UI/TextInput/TextInput";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import { makeId, updateErrors } from "../../shared/utils";


class LoginForm extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }

    if (nextProps.serverSideErrors) {
      return updateErrors(nextProps, prevState);
    }

    return null;
  }

  state = {
    form: {
      email: {
        id: `name_${makeId()}`,
        name: "email",
        inputType: "email",
        labelText: "Email address",
        info: "",
        error: "",
        value: ""
      },
      password: {
        id: `password_${makeId()}`,
        name: "password",
        inputType: "password",
        labelText: "Password",
        info: "",
        error: "",
        value: ""
      }
    },
    formId: `loginForm_${makeId()}`
  };

  componentDidMount() {
    this.inputRef.current.focus();
  }

  componentWillUnmount() {
    if (this.props.serverSideErrors) {
      this.props.clearErrors();
    }
  }

  inputRef = React.createRef();

  handleChange = (value, name) => {
    // eslint-disable-next-line
    const updatedForm = { ...this.state.form };
    const updatedElement = {
      ...updatedForm[name]
    };
    updatedElement.value = value;
    updatedForm[name] = updatedElement;
    this.setState({ form: updatedForm });
  };

  handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.form.email.value,
      password: this.state.form.password.value
    };

    this.props.loginUser(userData);
  };

  render() {
    const formElements = [];
    for (const key in this.state.form) {
      if (Object.prototype.hasOwnProperty.call(this.state.form, key)) {
        formElements.push(this.state.form[key]);
      }
    }

    return (
      <div className={classes.LoginFormWrapper}>
        <div className={classes.Title}>Log in</div>
        <form
          id={this.state.formId}
          onSubmit={() => this.handleSubmit()}
          className={classes.LoginForm}
        >
          {formElements.map(element => (
            <TextInput
              key={element.id}
              id={element.id}
              name={element.name}
              ref={element.name === "email" ? this.inputRef : null}
              inputType={element.inputType}
              labelText={element.labelText}
              info={element.info}
              error={element.error}
              value={element.value}
              handleChange={this.handleChange}
            />
          ))}
        </form>
        {this.props.loading ? <Spinner/> : <Button
          form={this.state.formId}
          handleClick={this.handleSubmit}
          type={"submit"}
          colorType={"primary"}
        >
          Log in
        </Button>}
      </div>
    );
  }
}

LoginForm.propTypes = {
  serverSideErrors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    serverSideErrors: state.serverErrors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: userData => dispatch(actionCreators.loginUser(userData)),
    clearErrors: () => dispatch(actionCreators.clearServerSideErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));
