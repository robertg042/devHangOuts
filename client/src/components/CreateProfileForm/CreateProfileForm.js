import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./CreateProfileForm.css";
import * as actionCreators from "../../store/actions";
import TextInput from "../UI/TextInput/TextInput";
import TextAreaInput from "../UI/TextAreaInput/TextAreaInput";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import { makeId } from "../../shared/utils";

class CreateProfileForm extends Component {
  constructor(props) {
    super(props);
    this.checkForRequired = this.checkForRequired.bind(this);
    this.state = {
      form: {
        handle: {
          id: `handle_${makeId()}`,
          name: "handle",
          inputType: "handle",
          labelText: "Profile handle",
          info: "A unique handle for your profile URL, which cannot be changed later",
          error: "",
          disabled: false,
          isRequired: true,
          value: ""
        },
        company: {
          id: `company_${makeId()}`,
          name: "company",
          inputType: "company",
          labelText: "Company",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        website: {
          id: `website_${makeId()}`,
          name: "website",
          inputType: "website",
          labelText: "Website",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        location: {
          id: `location_${makeId()}`,
          name: "location",
          inputType: "location",
          labelText: "Location",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        skills: {
          id: `skills_${makeId()}`,
          name: "skills",
          inputType: "skills",
          labelText: "Skills",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        githubUsername: {
          id: `githubUsername_${makeId()}`,
          name: "githubUsername",
          inputType: "githubUsername",
          labelText: "Github username",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        bio: {
          id: `bio_${makeId()}`,
          name: "bio",
          inputType: "bio",
          labelText: "Bio",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        }
        // },
        // handle2: {
        //   id: `handle_${makeId()}`,
        //   name: "handle",
        //   inputType: "handle",
        //   labelText: "Profile handle",
        //   info: "A unique handle for your profile URL, which cannot be changed later",
        //   error: "",
        //   disabled: false,
        //   isRequired: true,
        //   value: ""
        // },
        // company2: {
        //   id: `company_${makeId()}`,
        //   name: "company",
        //   inputType: "company",
        //   labelText: "Company",
        //   info: "",
        //   error: "",
        //   disabled: false,
        //   isRequired: false,
        //   value: ""
        // },
        // website2: {
        //   id: `website_${makeId()}`,
        //   name: "website",
        //   inputType: "website",
        //   labelText: "Website",
        //   info: "",
        //   error: "",
        //   disabled: false,
        //   isRequired: false,
        //   value: ""
        // },
        // location2: {
        //   id: `location_${makeId()}`,
        //   name: "location",
        //   inputType: "location",
        //   labelText: "Location",
        //   info: "",
        //   error: "",
        //   disabled: false,
        //   isRequired: false,
        //   value: ""
        // },
        // skills2: {
        //   id: `skills_${makeId()}`,
        //   name: "skills",
        //   inputType: "skills",
        //   labelText: "Skills",
        //   info: "",
        //   error: "",
        //   disabled: false,
        //   isRequired: false,
        //   value: ""
        // },
        // githubUsername2: {
        //   id: `githubUsername_${makeId()}`,
        //   name: "githubUsername",
        //   inputType: "githubUsername",
        //   labelText: "Github username",
        //   info: "",
        //   error: "",
        //   disabled: false,
        //   isRequired: false,
        //   value: ""
        // },
        // handle3: {
        //   id: `handle_${makeId()}`,
        //   name: "handle",
        //   inputType: "handle",
        //   labelText: "Profile handle",
        //   info: "A unique handle for your profile URL, which cannot be changed later",
        //   error: "",
        //   disabled: false,
        //   isRequired: true,
        //   value: ""
        // },
        // company3: {
        //   id: `company_${makeId()}`,
        //   name: "company",
        //   inputType: "company",
        //   labelText: "Company",
        //   info: "",
        //   error: "",
        //   disabled: false,
        //   isRequired: false,
        //   value: ""
        // },
        // website3: {
        //   id: `website_${makeId()}`,
        //   name: "website",
        //   inputType: "website",
        //   labelText: "Website",
        //   info: "",
        //   error: "",
        //   disabled: false,
        //   isRequired: false,
        //   value: ""
        // },
        // location3: {
        //   id: `location_${makeId()}`,
        //   name: "location",
        //   inputType: "location",
        //   labelText: "Location",
        //   info: "",
        //   error: "",
        //   disabled: false,
        //   isRequired: false,
        //   value: ""
        // },
        // skills3: {
        //   id: `skills_${makeId()}`,
        //   name: "skills",
        //   inputType: "skills",
        //   labelText: "Skills",
        //   info: "",
        //   error: "",
        //   disabled: false,
        //   isRequired: false,
        //   value: ""
        // },
        // githubUsername3: {
        //   id: `githubUsername_${makeId()}`,
        //   name: "githubUsername",
        //   inputType: "githubUsername",
        //   labelText: "Github username",
        //   info: "",
        //   error: "",
        //   disabled: false,
        //   isRequired: false,
        //   value: ""
        // }
      },
      formId: `createProfileForm_${makeId()}`,
      displayRequiredInfo: false
    };
    this.state.displayRequiredInfo = this.checkForRequired();
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

    // const userData = {
    //   email: this.state.form.email.value,
    //   password: this.state.form.password.value
    // };
    //
    // this.props.loginUser(userData);
  };

  render() {
    let requiredInfoTip = null;
    if (this.state.displayRequiredInfo) {
      requiredInfoTip = <div className={classes.InfoTip}>* field required</div>;
    }

    const formElements = [];
    for (const key in this.state.form) {
      if (Object.prototype.hasOwnProperty.call(this.state.form, key)) {
        formElements.push(this.state.form[key]);
      }
    }

    return (
      <div className={classes.CreateProfileFormWrapper}>
        <form
          id={this.state.formId}
          onSubmit={() => this.handleSubmit()}
          className={classes.CreateProfileForm}
        >
          <div className={classes.Title}>Create profile</div>
          {formElements.map(element => {
            if (element.name !== "bio") {
              return (<TextInput
                key={element.id}
                id={element.id}
                name={element.name}
                ref={element.name === "handle" ? this.inputRef : null}
                inputType={element.inputType}
                labelText={element.labelText}
                info={element.info}
                error={element.error}
                value={element.value}
                disabled={element.disabled}
                isRequired={element.isRequired}
                handleChange={this.handleChange}
              />);
            } else {
              return (
                <TextAreaInput
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  labelText={element.labelText}
                  info={element.info}
                  error={element.error}
                  value={element.value}
                  disabled={element.disabled}
                  isRequired={element.isRequired}
                  handleChange={this.handleChange}
                />
              );
            }
          })}
          {requiredInfoTip}
        </form>
        {this.props.loading ? <Spinner/> : <Button
          form={this.state.formId}
          handleClick={this.handleSubmit}
          type={"submit"}
          colorType={"primary"}
        >
          Create profile
        </Button>}
      </div>
    );
  }
}

CreateProfileForm.propTypes = {
  serverSideErrors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    serverSideErrors: state.serverErrors.errors,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearErrors: () => dispatch(actionCreators.clearServerSideErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfileForm));
