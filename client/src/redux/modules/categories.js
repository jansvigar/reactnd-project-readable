import { combineReducers } from 'redux';
import { getAllCategories } from '../../utils/api';

/*
  Categories Action Types
*/
export const FETCHING_CATEGORIES = 'FETCHING_CATEGORIES';
export const FETCHING_CATEGORIES_ERROR = 'FETCHING_CATEGORIES_ERROR';
export const FETCHING_CATEGORIES_SUCCESS = 'FETCHING_CATEGORIES_SUCCESS';

/*
  Categories Action Creators
*/
const fetchingCategories = () => ({
  type: FETCHING_CATEGORIES,
});

const fetchingCategoriesError = () => ({
  type: FETCHING_CATEGORIES_ERROR,
  error: 'Error fetching categories',
});

const fetchingCategoriesSuccess = data => ({
  type: FETCHING_CATEGORIES_SUCCESS,
  categories: data,
});

/*
 Categories Action Thunk
*/
export const fetchAndHandleCategories = () => (dispatch) => {
  dispatch(fetchingCategories());
  getAllCategories()
    .then(data => dispatch(fetchingCategoriesSuccess(data)))
    .catch(error => dispatch(fetchingCategoriesError(error)));
};

/*
 Categories Reducer
*/

/* eslint no-param-reassign:
  ["error",
    { "props": true,
      "ignorePropertyModificationsFor": ["nextState"] }
  ] */
function byName(state = {}, action) {
  switch (action.type) {
    case FETCHING_CATEGORIES_SUCCESS:
      return action.categories.reduce((nextState, category) => {
        nextState[category.name] = category;
        return nextState;
      }, { ...state });
    default:
      return state;
  }
}

function names(state = [], action) {
  switch (action.type) {
    case FETCHING_CATEGORIES_SUCCESS :
      return [
        ...state,
        ...action.categories.map(category => category.name),
      ];
    default :
      return state;
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case FETCHING_CATEGORIES:
      return true;
    case FETCHING_CATEGORIES_SUCCESS:
    case FETCHING_CATEGORIES_ERROR:
      return false;
    default:
      return state;
  }
}

function errorMessage(state = '', action) {
  switch (action.type) {
    case FETCHING_CATEGORIES_SUCCESS:
      return '';
    case FETCHING_CATEGORIES_ERROR:
      return action.error;
    default:
      return state;
  }
}

export default combineReducers({
  byName,
  names,
  isFetching,
  errorMessage,
});
