import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./SignupForm.css";
import TextInput from "../UI/TextInput/TextInput";
import Button from "../UI/Button/Button";

class SignupForm extends Component {
  state = {
    buttonDisabled: true
  };

  toggleDisabled = () => {
    this.setState(prevState => ({
      buttonDisabled: !prevState.buttonDisabled
    }));
  };

  render() {
    let requiredInfoTip = null;
    if (this.props.hasRequiredFields) {
      requiredInfoTip = <div className={classes.InfoTip}>* field required</div>;
    }

    let toggledButton = <Button handleClick={this.toggleDisabled} type={"button"} colorType={"primary"}>Disabled or not</Button>;
    if (this.state.buttonDisabled) {
      toggledButton = <Button handleClick={this.toggleDisabled} disabled type={"button"} colorType={"primary"}>Disabled or not</Button>;
    }

    return (
      <div className={classes.SignupForm}>
        <div className={classes.Title}>Sign up</div>
        <TextInput name={"Name"}
          inputType="text"
          labelText={"Name"}
          isRequired
          error={"This is an error!!!!"}
          info={"And this is an info"}
        />
        <TextInput
          name={"Name"}
          inputType="password"
          labelText={"Password"}
          isRequired
          disabled
        />
        {requiredInfoTip}
        <Button handleClick={this.toggleDisabled} type={"button"} colorType={"primary"}>Toggle</Button>
        { toggledButton }
      </div>
    );
  }
}

SignupForm.propTypes = {
  hasRequiredFields: PropTypes.bool.isRequired
};

export default SignupForm;
