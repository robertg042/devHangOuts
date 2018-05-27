const Validator = require("validator");
const isEmpty = require("../shared/isEmpty");
const utils = require("./utils");

const { fieldLengthNotValid } = require("../shared/messages");

const validateProfileInput = data => {
  const errors = {};

  // Fields' parameters
  const handleMinLength = 2;
  const handleMaxLength = 50;

  // If empty make sure values are strings
  const allProps = [
    "handle",
    "status",
    "skills",
    "website",
    "facebook",
    "twitter",
    "linkedin",
    "instagram"
  ];
  utils.assureEmptyStringIfEmpty(allProps, data);

  // Validate handle field
  if (
    !Validator.isLength(data.handle, {
      min: handleMinLength,
      max: handleMaxLength
    })
  ) {
    errors.handle = fieldLengthNotValid(
      "handle",
      handleMinLength,
      handleMaxLength
    );
  }

  // Check if required form fields are not empty
  const requiredProps = ["handle", "status"];
  utils.validateRequiredProps(requiredProps, data, errors);

  // Validate urls
  const urlProps = ["website", "facebook", "twitter", "linkedin", "instagram"];
  utils.validateUrlProps(urlProps, data, errors);

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateProfileInput;
