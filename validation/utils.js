const Validator = require("validator");
const isEmpty = require("../shared/isEmpty");
const { fieldIsRequired, ERROR_URL_INVALID, ERROR_URL_NOT_HTTP } = require("../shared/messages");

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

  // Check if url starts with http(s)
  urlProps.forEach(prop => {
    if (!obj[prop].match("^https?")) {
      errorsObj[prop] = ERROR_URL_NOT_HTTP;
    }
  });
};

module.exports = {
  assureEmptyStringIfEmpty,
  validateRequiredProps,
  validateUrlProps
};
