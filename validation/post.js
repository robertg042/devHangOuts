const Validator = require("validator");
const isEmpty = require("../shared/isEmpty");
const utils = require("./utils");

const { fieldLengthNotValid } = require("../shared/messages");

const validatePostInput = data => {
  const errors = {};
  const minTextLength = 1;
  const maxTextLength = 200;

  // If empty make sure values are strings
  const allProps = ["text"];
  utils.assureEmptyStringIfEmpty(allProps, data);

  if (
    !Validator.isLength(data.text, { min: minTextLength, max: maxTextLength })
  ) {
    errors.text = fieldLengthNotValid("text", minTextLength, maxTextLength);
  }

  // Check if required form fields are not empty
  const requiredProps = allProps;
  utils.validateRequiredProps(requiredProps, data, errors);

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validatePostInput;
