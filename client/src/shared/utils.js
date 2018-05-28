import axios from "axios";

export const makeId = (length = 5) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export const isEmpty = value =>
  typeof value === "undefined" ||
  value === null ||
  (typeof value.length !== "undefined" && value.length === 0) ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const updateErrors = (nextProps, prevState) => {
  const updatedForm = { ...prevState.form };
  for (const key in prevState.form) {
    if (prevState.form.hasOwnProperty(key)) {
      if (nextProps.serverSideErrors.hasOwnProperty(key)) {
        let errorMessage = nextProps.serverSideErrors[key];
        if (key === "password2") {
          errorMessage = errorMessage.replace("Password2", "Confirm password");
        }
        updatedForm[key] = {
          ...prevState.form[key],
          error: errorMessage
        };
      } else {
        updatedForm[key] = {
          ...prevState.form[key],
          error: ""
        };
      }
    }
  }
  if (nextProps.serverSideErrors.hasOwnProperty("error")) {
    for (const key in prevState.form) {
      if (prevState.form.hasOwnProperty(key)) {
        updatedForm[key] = {
          ...prevState.form[key],
          error: nextProps.serverSideErrors.error
        };
      }
    }
  }

  return ({
    ...prevState,
    form: updatedForm
  });
};

export const updateValues = (nextProps, prevState) => {
  const updatedForm = { ...prevState.form };
  const { profile } = nextProps;
  for (const key in prevState.form) {
    if (prevState.form.hasOwnProperty(key)) {
      if (profile.hasOwnProperty(key)) {
        let value = !isEmpty(profile[key]) ? profile[key] : "";
        if (key === "skills") {
          value = profile[key].join(",");
        }
        updatedForm[key] = {
          ...prevState.form[key],
          value: value
        };
      } else {
        updatedForm[key] = {
          ...prevState.form[key],
          value: ""
        };
      }
    }
  }

  return ({
    ...prevState,
    form: updatedForm
  });
};

export const capitalizeFirstLetter = str => `${str.charAt(0).toUpperCase() + str.slice(1)}`;

export const dynamicSort = property => {
  /* eslint-disable */
  // Usage:
  // const People = [
  //   {Name: "Name", Surname: "Surname"},
  //   {Name:"AAA", Surname:"ZZZ"},
  //   {Name: "Name", Surname: "AAA"}
  // ];
  // People.sort(dynamicSort("Name"));
  // People.sort(dynamicSort("Surname"));
  // People.sort(dynamicSort("-Surname"))
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

    return result * sortOrder;
  };
  /* eslint-enable */
};
