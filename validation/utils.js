const Validator = require("validator");
const isEmpty = require("../shared/isEmpty");
const { fieldIsRequired, ERROR_URL_INVALID } = require("../shared/messages");

const assureEmptyStringIfEmpty = (propArray, obj) => {
  propArray.forEach(prop => {
    obj[prop] = !isEmpty(obj[prop]) ? obj[prop] : "";
  });
};

// Appends error message to errorsObj if required prop is an empty string
const validateRequiredProps = (requiredProps, obj, errorsObj) => {
  requiredProps.forEach(prop => {
    if (Validator.isEmpty(obj[prop])) {
      errorsObj[prop] = fieldIsRequired(prop);
    }
  });
};

// Appends error message to errorsObj if url prop is not url
const validateUrlProps = (urlProps, obj, errorsObj) => {
  urlProps.forEach(prop => {
    if (!Validator.isEmpty(obj[prop]) && !Validator.isURL(obj[prop])) {
      errorsObj[prop] = ERROR_URL_INVALID;
    }
  });
};

module.exports = {
  assureEmptyStringIfEmpty,
  validateRequiredProps,
  validateUrlProps
};
