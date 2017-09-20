import { combineReducers } from 'redux';
import { getAllCategories as getAllCategoriesAPI } from '../../utils/api';

/* Categories Action Types */
export const FETCHING_CATEGORIES = 'FETCHING_CATEGORIES';
export const FETCHING_CATEGORIES_ERROR = 'FETCHING_CATEGORIES_ERROR';
export const FETCHING_CATEGORIES_SUCCESS = 'FETCHING_CATEGORIES_SUCCESS';

/* Categories Action Creators */
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

/* Categories Action Thunk */
export const fetchAndHandleCategories = () => (dispatch) => {
  dispatch(fetchingCategories());
  getAllCategoriesAPI()
    .then(
      data => dispatch(fetchingCategoriesSuccess(data)),
      error => dispatch(fetchingCategoriesError(error)),
    );
};

/* Categories Reducers */

/* eslint-disable no-param-reassign */
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
/* eslint-enable no-param-reassign */

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

function errorMessage(state = null, action) {
  switch (action.type) {
    case FETCHING_CATEGORIES_SUCCESS:
      return null;
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
