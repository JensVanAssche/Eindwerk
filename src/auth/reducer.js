import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
  ME_PENDING,
  ME_FULFILLED,
  ME_REJECTED
} from "./actions";

const initialState = {
  isLoggedIn: false,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        loading: false,
        isLoggedIn: true
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false
      };
    case LOGOUT_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOGOUT_FULFILLED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false
      };
    case LOGOUT_REJECTED:
      return {
        ...state,
        loading: false
      };
    case ME_PENDING:
      return {
        ...state,
        loading: true
      };
    case ME_FULFILLED:
      return {
        ...state,
        loading: false,
        isLoggedIn: true
      };
    case ME_REJECTED:
      return initialState;
    default:
      return state;
  }
}
