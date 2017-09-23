import { createSelector } from 'reselect';

const getCategoryNames = state => state.allCategories.names;
const getCategoryObjects = state => state.entities.categories;
export const getIsFetching = state => state.allCategories.isFetching;
export const getErrorMessage = state => state.allCategories.errorMessage;

/* Memoized Selectors */
export const getCategories = createSelector(
  [getCategoryNames, getCategoryObjects],
  (names, categories) => names.map(name => categories[name]),
);
