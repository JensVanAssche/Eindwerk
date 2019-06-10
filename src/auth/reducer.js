import {
  LOGIN_PARENT_PENDING,
  LOGIN_PARENT_FULFILLED,
  LOGIN_PARENT_REJECTED,
  LOGIN_CHILD_PENDING,
  LOGIN_CHILD_FULFILLED,
  LOGIN_CHILD_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  ME_PENDING,
  ME_FULFILLED,
  ME_REJECTED
} from "./actions";

const initialState = {
  parentLoggedIn: false,
  childLoggedIn: false,
  user: null,
  loading: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_PARENT_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOGIN_PARENT_FULFILLED:
      return {
        ...state,
        loading: false,
        parentLoggedIn: true,
        user: action.payload
      };
    case LOGIN_PARENT_REJECTED:
      return initialState;
    case LOGIN_CHILD_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOGIN_CHILD_FULFILLED:
      return {
        ...state,
        loading: false,
        childLoggedIn: true,
        user: action.payload
      };
    case LOGIN_CHILD_REJECTED:
      return initialState;
    case LOGOUT_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOGOUT_FULFILLED:
      return {
        ...state,
        parentLoggedIn: false,
        childLoggedIn: false,
        user: null,
        loading: false
      };
    case ME_PENDING:
      return {
        ...state,
        loading: true
      };
    case ME_FULFILLED:
      if (action.payload.type === "parent") {
        return {
          ...state,
          loading: false,
          parentLoggedIn: true,
          user: action.payload
        };
      }
      return {
        ...state,
        loading: false,
        childLoggedIn: true,
        user: action.payload
      };
    case ME_REJECTED:
      return initialState;
    default:
      return state;
  }
}
