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
import { makeId, updateErrors, isEmpty } from "../../shared/utils";

class CreateProfileForm extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let state = { ...prevState };
    if (!prevState.initiallyFocused && prevState.focusedRef && prevState.focusedRef.current) {
      prevState.focusedRef.current.focus();
      state = { ...prevState, initiallyFocused: true };
    }
    if (nextProps.serverSideErrors) {
      state = updateErrors(nextProps, state);
    }

    return state;
  }

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
        status: {
          id: `status_${makeId()}`,
          name: "status",
          inputType: "select",
          info: "",
          error: "",
          disabled: false,
          isRequired: true,
          value: "",
          defaultOption: { label: "*Select your professional status", value: "" },
          options: [
            { label: "Project manager", value: "Project manager" },
            { label: "Senior developer", value: "Senior developer" },
            { label: "Developer", value: "Developer" },
            { label: "Junior developer", value: "Junior developer" },
            { label: "Teacher", value: "Teacher" },
            { label: "Student", value: "Student" },
            { label: "Intern", value: "Intern" },
            { label: "Other", value: "Other" }
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
        githubusername: {
          id: `githubusername_${makeId()}`,
          name: "githubusername",
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
        linkedin: {
          id: `linkedin_${makeId()}`,
          name: "linkedin",
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
      displayRequiredInfo: false,
      focusedRef: null,
      /* eslint-disable react/no-unused-state */
      initiallyFocused: false
      /* eslint-enable */
    };
    this.state.form.status.value = this.state.form.status.defaultOption.value;
    this.state.displayRequiredInfo = this.checkForRequired();
    this.state.focusedRef = React.createRef();
  }

  componentDidMount() {
    const { profile, getCurrentProfile } = this.props;
    if (isEmpty(profile)) {
      getCurrentProfile();
    }
  }

  componentWillUnmount() {
    if (this.props.serverSideErrors) {
      this.props.clearErrors();
    }
  }

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
    const profileData = {};
    const { form } = this.state;
    const formKeys = Object.keys(form);

    formKeys.forEach(key => {
      profileData[key] = form[key].value;
    });

    this.props.createProfile(profileData, this.props.history);
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

    const { profile } = this.props;
    let formContents = <Spinner/>;
    if (profile) {
      if (Object.keys(profile).length !== 0) {
        this.props.history.replace("/edit-profile");
      } else {
        formContents = (
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
                    ref={element.name === "handle" ? this.state.focusedRef : null}
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
              colorType={"primary"}
            >
              Create profile
            </Button>}
          </div>
        );
      }
    }

    return formContents;
  }
}

CreateProfileForm.propTypes = {
  serverSideErrors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    serverSideErrors: state.serverErrors.errors,
    loading: state.profile.loading,
    profile: state.profile.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentProfile: () => dispatch(actionCreators.getCurrentProfile()),
    clearErrors: () => dispatch(actionCreators.clearServerSideErrors()),
    createProfile: (profileData, history) => dispatch(actionCreators.createProfile(profileData, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfileForm));
