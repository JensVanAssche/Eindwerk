import { createSelector } from "reselect";

const selectNode = state => state.auth;

export const selectParentLoggedIn = createSelector(
  selectNode,
  node => node.parentLoggedIn
);

export const selectChildLoggedIn = createSelector(
  selectNode,
  node => node.childLoggedIn
);

export const selectUser = createSelector(
  selectNode,
  node => node.user
);

export const selectLoading = createSelector(
  selectNode,
  node => node.loading
);
