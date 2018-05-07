// user
const ERROR_EMAIL_EXISTS_MESSAGE = "Email already exists";
const nameLengthNotValid = (min, max) =>
  `Name must be between ${min} and ${max} characters`;
const ERROR_INVALID_AUTH_DATA = "Invalid authentication data";
const ERROR_NAME_FIELD_REQUIRED = "Name field is required";
const ERROR_EMAIL_FIELD_REQUIRED = "Email field is required";
const ERROR_EMAIL_INVALID = "This is not a valid email address";
const ERROR_PASSWORD_FIELD_REQUIRED = "Password field is required";
const ERROR_PASSWORD_TOO_SHORT = "Password is too short";
const ERROR_PASSWORD_TOO_LONG = "Password is too long";
const ERROR_PASSWORD2_FIELD_REQUIRED = "Confirm password field is required";
const ERROR_PASSWORD2_FIELD_NOT_MATCH = "Password fields must match";

// profile
const ERROR_PROFILE_NOT_FOUND = "There is no profile for this user";

module.exports = {
  ERROR_EMAIL_EXISTS_MESSAGE,
  nameLengthNotValid,
  ERROR_INVALID_AUTH_DATA,
  ERROR_NAME_FIELD_REQUIRED,
  ERROR_EMAIL_FIELD_REQUIRED,
  ERROR_EMAIL_INVALID,
  ERROR_PASSWORD_FIELD_REQUIRED,
  ERROR_PASSWORD_TOO_SHORT,
  ERROR_PASSWORD_TOO_LONG,
  ERROR_PASSWORD2_FIELD_REQUIRED,
  ERROR_PASSWORD2_FIELD_NOT_MATCH,
  ERROR_PROFILE_NOT_FOUND
};
