const Validator = require("validator");
const isEmpty = require("../shared/isEmpty");
const utils = require("./utils");

const {
  fieldLengthNotValid,
  ERROR_EMAIL_INVALID,
  ERROR_PASSWORD2_FIELD_NOT_MATCH
} = require("../shared/messages");

const validateRegisterInput = data => {
  const errors = {};

  // Fields' parameters
  const nameMinLength = 2;
  const nameMaxLength = 50;
  const passwordMinLength = 8;
  const passwordMaxLength = 50;

  // If empty make sure values are strings
  const allProps = ["name", "email", "password", "password2"];
  utils.assureEmptyStringIfEmpty(allProps, data);

  // Validate name field length
  if (
    !Validator.isLength(data.name, {
      min: nameMinLength,
      max: nameMaxLength
    })
  ) {
    errors.name = fieldLengthNotValid("name", nameMinLength, nameMaxLength);
  }

  // Validate email field
  if (!Validator.isEmail(data.email)) {
    errors.email = ERROR_EMAIL_INVALID;
  }

  // Validate password length
  if (
    !Validator.isLength(data.password, {
      min: passwordMinLength,
      max: passwordMaxLength
    })
  ) {
    errors.password = fieldLengthNotValid(
      "password",
      passwordMinLength,
      passwordMaxLength
    );
  }

  // Validate if password2 field match password field
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = ERROR_PASSWORD2_FIELD_NOT_MATCH;
  }

  // Check if required form fields are not empty
  const requiredProps = allProps; // all props are required
  utils.validateRequiredProps(requiredProps, data, errors);

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateRegisterInput;
