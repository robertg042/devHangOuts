const Validator = require("validator");
const isEmpty = require("../shared/isEmpty");
const utils = require("./utils");

const { ERROR_EMAIL_INVALID } = require("../shared/messages");

const validateLoginInput = data => {
  const errors = {};

  // If empty make sure values are strings
  const allProps = ["email", "password"];
  utils.assureEmptyStringIfEmpty(allProps, data);

  // Validate email field
  if (!Validator.isEmail(data.email)) {
    errors.email = ERROR_EMAIL_INVALID;
  }

  // Check if required form fields are not empty
  const requiredProps = ["email", "password"];
  utils.validateRequiredProps(requiredProps, data, errors);

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateLoginInput;
