import * as actionsTypes from "./actionTypes";

export const saveNameValue = value => {
  return {
    type: actionsTypes.SAVE_NAME_VALUE,
    value: value
  };
};

export const saveEmailValue = value => {
  return {
    type: actionsTypes.SAVE_EMAIL_VALUE,
    value: value
  };
};

export const savePasswordValue = value => {
  return {
    type: actionsTypes.SAVE_PASSWORD_VALUE,
    value: value
  };
};

export const savePassword2Value = value => {
  return {
    type: actionsTypes.SAVE_PASSWORD2_VALUE,
    value: value
  };
};
