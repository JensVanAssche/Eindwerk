import api from "./api";

export const GET_CHILDREN = "GET_CHRILDREN";
export const GET_CHILDREN_REJECTED = "GET_CHRILDREN_REJECTED";
export const GET_CHILDREN_PENDING = "GET_CHRILDREN_PENDING";
export const GET_CHILDREN_FULFILLED = "GET_CHRILDREN_FULFILLED";

export const DELETE_CHILD = "DELETE_CHILD";
export const DELETE_CHILD_REJECTED = "DELETE_CHILD_REJECTED";
export const DELETE_CHILD_PENDING = "DELETE_CHILD_PENDING";
export const DELETE_CHILD_FULFILLED = "DELETE_CHILD_FULFILLED";

export function getChildren(parentId) {
  return {
    type: GET_CHILDREN,
    payload: api.getAll(parentId)
  };
}

export function deleteChild(id) {
  return {
    type: DELETE_CHILD,
    payload: api.deleteChild(id)
  };
}
