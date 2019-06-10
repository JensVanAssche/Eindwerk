import { createSelector } from "reselect";

const selectNode = state => state.dashboard;

export const selectChildren = createSelector(
  selectNode,
  node => node.children
);
