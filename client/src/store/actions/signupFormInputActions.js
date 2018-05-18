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

export const savePasswordRepeatValue = value => {
  return {
    type: actionsTypes.SAVE_PASSWORD_REPEAT_VALUE,
    value: value
  };
};
