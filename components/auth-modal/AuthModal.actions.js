import actionTypes from "./AuthModal.types";

export const setUser = payload => ({
  type: actionTypes.SET_USER,
  payload
});

export const setChecked = payload => ({
  type: actionTypes.SET_CHECKED,
  payload
});

export const logout = () => ({
  type: actionTypes.LOGOUT
});