const Validator = require("validator");
const isEmpty = require("../shared/isEmpty");
const utils = require("./utils");

const { fieldLengthNotValid } = require("../shared/messages");

const validateExperienceInput = data => {
  const errors = {};

  const minLocationLength = 2;
  const maxLocationLength = 60;

  // If empty make sure values are strings
  const allProps = ["title", "company", "from", "to", "location", "description"];
  utils.assureEmptyStringIfEmpty(allProps, data);

  // Check if required form fields are not empty
  const requiredProps = ["title", "company", "from"];
  utils.validateRequiredProps(requiredProps, data, errors);

  if (
    !Validator.isEmpty(data.location) &&
    !Validator.isLength(data.location, {
      min: minLocationLength,
      max: maxLocationLength
    })
  ) {
    errors.location = fieldLengthNotValid(
      "location",
      minLocationLength,
      maxLocationLength
    );
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateExperienceInput;
