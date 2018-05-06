const Validator = require("validator");
const isEmpty = require("../shared/isEmpty");

const {
  ERROR_EMAIL_FIELD_REQUIRED,
  ERROR_EMAIL_INVALID,
  ERROR_PASSWORD_FIELD_REQUIRED
} = require("../shared/messages");

const validateLoginInput = data => {
  const errors = {};

  // If empty make sure values are strings
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Validate email field
  if (!Validator.isEmail(data.email)) {
    errors.email = ERROR_EMAIL_INVALID;
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = ERROR_EMAIL_FIELD_REQUIRED;
  }

  // Validate password
  if (Validator.isEmpty(data.password)) {
    errors.password = ERROR_PASSWORD_FIELD_REQUIRED;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateLoginInput;
