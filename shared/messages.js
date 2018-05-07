const fieldLengthNotValid = (field, min, max) => {
  let msg = "";
  if (typeof field === "string") {
    msg = `${field.charAt(0).toUpperCase() +
      field.slice(1)} must be between ${min} and ${max} characters`;
  }

  return msg;
};

const fieldIsRequired = field => {
  let msg = "";
  if (typeof field === "string") {
    msg = `${field.charAt(0).toUpperCase() + field.slice(1)} field is required`;
  }

  return msg;
};

const fieldAlreadyExists = field => {
  let msg = "";
  if (typeof field === "string") {
    msg = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  return msg;
};

// user
const ERROR_INVALID_AUTH_DATA = "Invalid authentication data";
const ERROR_EMAIL_INVALID = "This is not a valid email address";
const ERROR_PASSWORD2_FIELD_NOT_MATCH = "Password fields must match";
const ERROR_INTERNAL_ERROR = "Internal error";

// profile
const ERROR_PROFILE_NOT_FOUND = "There is no profile for this user";
const ERROR_PROFILES_NOT_FOUND = "There are no profiles";
const ERROR_URL_INVALID = "This is not a valid URL";

module.exports = {
  fieldLengthNotValid,
  fieldIsRequired,
  fieldAlreadyExists,
  ERROR_INVALID_AUTH_DATA,
  ERROR_EMAIL_INVALID,
  ERROR_PASSWORD2_FIELD_NOT_MATCH,
  ERROR_INTERNAL_ERROR,
  ERROR_PROFILE_NOT_FOUND,
  ERROR_PROFILES_NOT_FOUND,
  ERROR_URL_INVALID
};
