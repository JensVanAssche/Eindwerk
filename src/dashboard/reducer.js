import {
  GET_CHILDREN_FULFILLED,
  GET_CHILDREN_REJECTED,
  DELETE_CHILD_FULFILLED,
  DELETE_CHILD_REJECTED
} from "./actions";

const initialState = {
  children: []
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHILDREN_FULFILLED:
      return {
        ...state,
        children: action.payload
      };
    case GET_CHILDREN_REJECTED:
      return initialState;
    case DELETE_CHILD_FULFILLED:
      return {
        ...state,
        children: state.children.filter(child => child.id !== action.payload.id)
      };
    case DELETE_CHILD_REJECTED:
      return initialState;
    default:
      return state;
  }
}
