import { createSelector } from 'reselect';

/* Input Selectors */
const getCategoryNames = state => state.categories.names;
const getCategoryObjects = state => state.categories.byName;
export const getIsFetching = state => state.categories.isFetching;
export const getErrorMessage = state => state.categories.errorMessage;

/* Memoized Selectors */
export const getCategories = createSelector(
  [getCategoryNames, getCategoryObjects],
  (names, categories) => names.map(name => categories[name]),
);
