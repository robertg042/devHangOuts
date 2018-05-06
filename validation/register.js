const Validator = require("validator");
const isEmpty = require("../shared/isEmpty");

const {
  nameLengthNotValid,
  ERROR_NAME_FIELD_REQUIRED,
  ERROR_EMAIL_FIELD_REQUIRED,
  ERROR_EMAIL_INVALID,
  ERROR_PASSWORD_FIELD_REQUIRED,
  ERROR_PASSWORD_TOO_SHORT,
  ERROR_PASSWORD_TOO_LONG,
  ERROR_PASSWORD2_FIELD_REQUIRED,
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
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Validate name field
  if (
    !Validator.isLength(data.name, {
      min: nameMinLength,
      max: nameMaxLength
    })
  ) {
    errors.name = nameLengthNotValid(nameMinLength, nameMaxLength);
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = ERROR_NAME_FIELD_REQUIRED;
  }

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
  } else if (
    !Validator.isLength(data.password, {
      min: passwordMinLength
    })
  ) {
    errors.password = ERROR_PASSWORD_TOO_SHORT;
  } else if (
    !Validator.isLength(data.password, {
      min: passwordMinLength,
      max: passwordMaxLength
    })
  ) {
    errors.password = ERROR_PASSWORD_TOO_LONG;
  }

  // Validate password2
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = ERROR_PASSWORD2_FIELD_NOT_MATCH;
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = ERROR_PASSWORD2_FIELD_REQUIRED;
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateRegisterInput;
