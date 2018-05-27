import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./CreateProfileForm.css";
import * as actionCreators from "../../store/actions";
import TextInput from "../UI/TextInput/TextInput";
import TextAreaInput from "../UI/TextAreaInput/TextAreaInput";
import SelectInput from "../UI/SelectInput/SelectInput";
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
          inputType: "text",
          labelText: "Profile handle",
          icon: "fas fa-user-circle",
          info: "A unique handle for your profile URL",
          error: "",
          disabled: false,
          isRequired: true,
          value: ""
        },
        professionalStatus: {
          id: `professionalStatus_${makeId()}`,
          name: "professionalStatus",
          inputType: "select",
          info: "",
          error: "",
          disabled: false,
          isRequired: true,
          value: "",
          defaultOption: { label: "*Select your professional status", value: "default" },
          options: [
            { label: "Project manager", value: "projectManager" },
            { label: "Senior developer", value: "seniorDev" },
            { label: "Developer", value: "dev" },
            { label: "Junior developer", value: "juniorDev" },
            { label: "Teacher", value: "teacher" },
            { label: "Student", value: "student" },
            { label: "Intern", value: "intern" },
            { label: "Other", value: "other" }
          ]
        },
        company: {
          id: `company_${makeId()}`,
          name: "company",
          inputType: "text",
          labelText: "Company",
          icon: null,
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        website: {
          id: `website_${makeId()}`,
          name: "website",
          inputType: "text",
          labelText: "Website",
          icon: null,
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        location: {
          id: `location_${makeId()}`,
          name: "location",
          inputType: "text",
          labelText: "Location",
          icon: null,
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        skills: {
          id: `skills_${makeId()}`,
          name: "skills",
          inputType: "text",
          labelText: "Skills",
          icon: null,
          info: "Please use comma separated values",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        githubUsername: {
          id: `githubUsername_${makeId()}`,
          name: "githubUsername",
          inputType: "text",
          labelText: "Github username",
          icon: "fab fa-github",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        bio: {
          id: `bio_${makeId()}`,
          name: "bio",
          labelText: "Bio",
          inputType: "textArea",
          info: "",
          icon: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        twitter: {
          id: `twitter_${makeId()}`,
          name: "twitter",
          inputType: "text",
          labelText: "Twitter profile URL",
          icon: "fab fa-twitter",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        facebook: {
          id: `facebook_${makeId()}`,
          name: "facebook",
          inputType: "text",
          labelText: "Facebook profile URL",
          icon: "fab fa-facebook",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        linkedIn: {
          id: `linkedIn_${makeId()}`,
          name: "linkedIn",
          inputType: "text",
          labelText: "LinkedIn profile URL",
          icon: "fab fa-linkedin",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        youtube: {
          id: `youtube_${makeId()}`,
          name: "youtube",
          inputType: "text",
          labelText: "Youtube profile URL",
          icon: "fab fa-youtube",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        },
        instagram: {
          id: `instagram_${makeId()}`,
          name: "instagram",
          inputType: "text",
          labelText: "Instagram profile URL",
          icon: "fab fa-instagram",
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        }
      },
      formId: `createProfileForm_${makeId()}`,
      displayRequiredInfo: false
    };
    this.state.form.professionalStatus.value = this.state.form.professionalStatus.defaultOption.value;
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
        <div className={classes.Title}>Create profile</div>
        <form
          id={this.state.formId}
          onSubmit={() => this.handleSubmit()}
          className={classes.CreateProfileForm}
        >
          {formElements.map(element => {
            if (element.inputType === "textArea") {
              return (
                <TextAreaInput
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  labelText={element.labelText}
                  icon={element.icon}
                  info={element.info}
                  error={element.error}
                  value={element.value}
                  disabled={element.disabled}
                  isRequired={element.isRequired}
                  handleChange={this.handleChange}
                />
              );
            } else if (element.inputType === "select") {
              return (
                <SelectInput
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  labelText={element.labelText}
                  icon={element.icon}
                  info={element.info}
                  error={element.error}
                  value={element.value}
                  disabled={element.disabled}
                  isRequired={element.isRequired}
                  handleChange={this.handleChange}
                  defaultOption={element.defaultOption}
                  options={element.options}
                />
              );
            } else {
              return (<TextInput
                key={element.id}
                id={element.id}
                name={element.name}
                ref={element.name === "handle" ? this.inputRef : null}
                inputType={element.inputType}
                labelText={element.labelText}
                icon={element.icon}
                info={element.info}
                error={element.error}
                value={element.value}
                disabled={element.disabled}
                isRequired={element.isRequired}
                handleChange={this.handleChange}
              />);
            }
          })}
          {requiredInfoTip}
        </form>
        {this.props.loading ? <Spinner/> : <Button
          form={this.state.formId}
          handleClick={this.handleSubmit}
          type={"submit"}
          colorType={"secondary"}
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
