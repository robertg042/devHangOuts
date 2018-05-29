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

const fieldNotFound = field => {
  let msg = "";
  if (typeof field === "string") {
    msg = `${field.charAt(0).toUpperCase() + field.slice(1)} not found`;
  }

  return msg;
};

// user
const ERROR_INVALID_AUTH_DATA = "Invalid authentication data";
const ERROR_EMAIL_INVALID = "This is not a valid email address";
const ERROR_PASSWORD2_FIELD_NOT_MATCH = "Password fields must match";
const ERROR_INTERNAL_ERROR = "Internal error";

// profile
const ERROR_URL_INVALID = "This is not a valid URL";
const ERROR_URL_NOT_HTTP = "URL has to start with all lowercase \"http://\" or \"https://\"";

// posts
const ERROR_USER_NOT_AUTHORIZED = "User not authorized";
const ERROR_USER_ALREADY_LIKED_POST = "User already liked the post";
const ERROR_CANNOT_DISLIKE_POST = "User has not liked the post yet";

module.exports = {
  fieldLengthNotValid,
  fieldIsRequired,
  fieldAlreadyExists,
  fieldNotFound,
  ERROR_INVALID_AUTH_DATA,
  ERROR_EMAIL_INVALID,
  ERROR_PASSWORD2_FIELD_NOT_MATCH,
  ERROR_INTERNAL_ERROR,
  ERROR_URL_INVALID,
  ERROR_URL_NOT_HTTP,
  ERROR_USER_NOT_AUTHORIZED,
  ERROR_USER_ALREADY_LIKED_POST,
  ERROR_CANNOT_DISLIKE_POST
};
