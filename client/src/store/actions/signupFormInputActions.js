import * as actionsTypes from "./actionTypes";

export const saveNameValue = value => {
  return {
    type: actionsTypes.SAVE_NAME_VALUE,
    value: value
  };
};
