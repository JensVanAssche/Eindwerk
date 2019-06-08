import api from "./api";

export const LOGIN = "LOGIN";
export const LOGIN_REJECTED = "LOGIN_REJECTED";
export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_FULFILLED = "LOGIN_FULFILLED";

export const LOGOUT = "LOGOUT";
export const LOGOUT_REJECTED = "LOGOUT_REJECTED";
export const LOGOUT_PENDING = "LOGOUT_PENDING";
export const LOGOUT_FULFILLED = "LOGOUT_FULFILLED";

export const ME = "ME";
export const ME_REJECTED = "ME_REJECTED";
export const ME_PENDING = "ME_PENDING";
export const ME_FULFILLED = "ME_FULFILLED";

export function login(email, password) {
  return {
    type: LOGIN,
    payload: api.login(email, password)
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
