const isEmpty = require("../shared/isEmpty");
const utils = require("./utils");

const validateExperienceInput = data => {
  const errors = {};

  // If empty make sure values are strings
  const allProps = ["school", "degree", "fieldofstudy", "from"];
  utils.assureEmptyStringIfEmpty(allProps, data);

  // Check if required form fields are not empty
  const requiredProps = allProps;
  utils.validateRequiredProps(requiredProps, data, errors);

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateExperienceInput;
