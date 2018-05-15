import React from "react";

import classes from "./SignupForm.css";
import TextInput from "../UI/TextInput/TextInput";

const signupForm = ({ hasRequiredFields }) => {
  let requiredInfoTip = null;
  if (hasRequiredFields) {
    requiredInfoTip = <div className={classes.InfoTip}>* field required</div>;
  }

  return (
    <div className={classes.SignupForm}>
      <div>Sign up</div>
      <TextInput name={"Name"} inputType="text" labelText={"Name"} isRequired />
      <TextInput
        name={"Name"}
        inputType="password"
        labelText={"Password"}
        isRequired
      />
      {requiredInfoTip}
    </div>
  );
};

export default signupForm;
