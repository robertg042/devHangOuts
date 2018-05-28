const Validator = require("validator");
const isEmpty = require("../shared/isEmpty");
const utils = require("./utils");

const { fieldLengthNotValid } = require("../shared/messages");

const validateEducationInput = data => {
  const errors = {};

  const minLocationLength = 2;
  const maxLocationLength = 60;

  // If empty make sure values are strings
  const allProps = ["school", "degree", "fieldofstudy", "from", "to", "location", "description"];
  utils.assureEmptyStringIfEmpty(allProps, data);

  // Check if required form fields are not empty
  const requiredProps = ["school", "degree", "fieldofstudy", "from"];
  utils.validateRequiredProps(requiredProps, data, errors);

  // Change error message for "fieldofstudy"
  if (!isEmpty(errors.fieldofstudy)) {
    errors.fieldofstudy = errors.fieldofstudy.replace("Fieldofstudy", "Field of study");
  }

  // Either "to" date or current field is required
  if (Validator.isEmpty(data.to) && !data.current) {
    errors.to = "Field is required if it's not a current job";
  }

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
module.exports = validateEducationInput;
