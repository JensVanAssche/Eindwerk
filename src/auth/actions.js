import api from "./api";

export const LOGIN_PARENT = "LOGIN_PARENT";
export const LOGIN_PARENT_REJECTED = "LOGIN_PARENT_REJECTED";
export const LOGIN_PARENT_PENDING = "LOGIN_PARENT_PENDING";
export const LOGIN_PARENT_FULFILLED = "LOGIN_PARENT_FULFILLED";

export const LOGIN_CHILD = "LOGIN_CHILD";
export const LOGIN_CHILD_REJECTED = "LOGIN_CHILD_REJECTED";
export const LOGIN_CHILD_PENDING = "LOGIN_CHILD_PENDING";
export const LOGIN_CHILD_FULFILLED = "LOGIN_CHILD_FULFILLED";

export const LOGOUT = "LOGOUT";
export const LOGOUT_REJECTED = "LOGOUT_REJECTED";
export const LOGOUT_PENDING = "LOGOUT_PENDING";
export const LOGOUT_FULFILLED = "LOGOUT_FULFILLED";

export const ME = "ME";
export const ME_REJECTED = "ME_REJECTED";
export const ME_PENDING = "ME_PENDING";
export const ME_FULFILLED = "ME_FULFILLED";

export const SIGNUP_PARENT = "SIGNUP_PARENT";
export const SIGNUP_PARENT_REJECTED = "SIGNUP_PARENT_REJECTED";
export const SIGNUP_PARENT_PENDING = "SIGNUP_PARENT_PENDING";
export const SIGNUP_PARENT_FULFILLED = "SIGNUP_PARENT_FULFILLED";

export const SIGNUP_CHILD = "SIGNUP_CHILD";
export const SIGNUP_CHILD_REJECTED = "SIGNUP_CHILD_REJECTED";
export const SIGNUP_CHILD_PENDING = "SIGNUP_CHILD_PENDING";
export const SIGNUP_CHILD_FULFILLED = "SIGNUP_CHILD_FULFILLED";

export function loginParent(email, password) {
  return {
    type: LOGIN_PARENT,
    payload: api.loginParent(email, password)
  };
}

export function loginChild(firstName, lastName, email, password) {
  return {
    type: LOGIN_CHILD,
    payload: api.loginChild(firstName, lastName, email, password)
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: api.logout()
  };
}

export function me() {
  return {
    type: ME,
    payload: api.me()
  };
}

export function signupParent(firstName, lastName, email, password) {
  return {
    type: SIGNUP_PARENT,
    payload: api.signupParent(firstName, lastName, email, password)
  };
}

export function signupChild(firstName, lastName, parentId, password) {
  return {
    type: SIGNUP_CHILD,
    payload: api.signupChild(firstName, lastName, parentId, password)
  };
}
