import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./AddExperienceForm.css";
import * as actionCreators from "../../store/actions";
import TextInput from "../UI/TextInput/TextInput";
import TextAreaInput from "../UI/TextAreaInput/TextAreaInput";
import DateInput from "../UI/DateInput/DateInput";
import CheckBoxInput from "../UI/CheckBoxInput/CheckBoxInput";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import { makeId, updateErrors, updateValues, isEmpty } from "../../shared/utils";

class AddExperienceForm extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let state = { ...prevState };
    if (!prevState.initiallyFocused && prevState.focusedRef && prevState.focusedRef.current) {
      prevState.focusedRef.current.focus();
      state = { ...prevState, initiallyFocused: true };
    }
    if (!prevState.initiallyFilled && nextProps.profile) {
      state = updateValues(nextProps, state);
      state = { ...state, initiallyFilled: true };
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
        title: {
          id: `title_${makeId()}`,
          name: "title",
          inputType: "text",
          labelText: "Job title",
          icon: "",
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
        from: {
          id: `from_${makeId()}`,
          name: "from",
          inputType: "date",
          labelText: "From",
          icon: null,
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: "",
          max: ""
        },
        to: {
          id: `to_${makeId()}`,
          name: "to",
          inputType: "date",
          labelText: "To",
          icon: null,
          info: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: "",
          max: "",
          previousValue: ""
        },
        current: {
          id: `current_${makeId()}`,
          name: "current",
          labelText: "Current job",
          inputType: "checkbox",
          info: "",
          icon: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: false
        },
        description: {
          id: `description_${makeId()}`,
          name: "description",
          labelText: "Description",
          inputType: "textArea",
          info: "",
          icon: "",
          error: "",
          disabled: false,
          isRequired: false,
          value: ""
        }
      },
      formId: `addExperienceForm_${makeId()}`,
      displayRequiredInfo: false,
      focusedRef: null,
      /* eslint-disable react/no-unused-state */
      initiallyFocused: false,
      initiallyFilled: false
      /* eslint-enable */
    };
    this.state.displayRequiredInfo = this.checkForRequired();
    const today = this.setInputMaxDateToToday();
    this.state.form.from.max = today;
    this.state.form.to.max = today;
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
    if (name === "current") {
      const toElement = {
        ...updatedForm.to
      };
      // swap values
      [toElement.value, toElement.previousValue] = [toElement.previousValue, toElement.value];
      toElement.disabled = value;
      updatedForm.to = toElement;
    }
    this.setState({ form: updatedForm });
  };

  handleSubmit = event => {
    event.preventDefault();
    const experienceData = {};
    const { form } = this.state;
    const formKeys = Object.keys(form);

    formKeys.forEach(key => {
      experienceData[key] = form[key].value;
    });
    // Make sure boolean is send, not ""
    experienceData.current = !isEmpty(experienceData.current);

    this.props.addExperience(experienceData, this.props.history);
  };

  go = path => {
    this.props.history.push(path);
  };

  setInputMaxDateToToday = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }

    return `${yyyy}-${mm}-${dd}`;
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
      if (Object.keys(profile).length === 0) {
        this.props.history.replace("/create-profile");
      } else {
        formContents = (
          <div className={classes.AddExperienceFormWrapper}>
            <div className={classes.AlignStart}>
              <Button type={"button"} colorType={"secondary"} handleClick={this.go.bind(this, "/dashboard")}>
                <i className={"fas fa-angle-left"}/>
                Go to dashboard
              </Button>
            </div>
            <div className={classes.Title}>Add experience</div>
            <form
              id={this.state.formId}
              onSubmit={() => this.handleSubmit()}
              className={classes.AddExperienceForm}
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
                } else if (element.inputType === "date") {
                  return (
                    <DateInput
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
                      max={element.max}
                    />
                  );
                } else if (element.inputType === "checkbox") {
                  return (
                    <CheckBoxInput
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
                } else {
                  return (<TextInput
                    key={element.id}
                    id={element.id}
                    name={element.name}
                    ref={element.name === "company" ? this.state.focusedRef : null}
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
              Add experience
            </Button>}
          </div>
        );
      }
    }

    return formContents;
  }
}

AddExperienceForm.propTypes = {
  serverSideErrors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  addExperience: PropTypes.func.isRequired
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
    addExperience: (profileData, history) => dispatch(actionCreators.addExperience(profileData, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(withRouter(AddExperienceForm));
