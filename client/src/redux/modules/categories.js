import { combineReducers } from 'redux';
import { normalize } from 'normalizr';
import { categoryListSchema } from '../schema';
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

const fetchingCategoriesSuccess = response => ({
  type: FETCHING_CATEGORIES_SUCCESS,
  response,
});

/* Categories Action Thunk */
export const fetchAndHandleCategories = () => (dispatch) => {
  dispatch(fetchingCategories());
  getAllCategoriesAPI()
    .then(
      (response) => {
        const normalizedResponse = normalize(response, categoryListSchema);
        dispatch(fetchingCategoriesSuccess(normalizedResponse));
      },
      error => dispatch(fetchingCategoriesError(error)),
    );
};

/* Categories Reducers */
function names(state = [], action) {
  switch (action.type) {
    case FETCHING_CATEGORIES_SUCCESS :
      return [
        ...state,
        ...action.response.result,
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

export const allCategories = combineReducers({
  names,
  isFetching,
  errorMessage,
});

export default function categories(state = {}, action) {
  switch (action.type) {
    case FETCHING_CATEGORIES_SUCCESS:
      return {
        ...state,
        ...action.response.entities.categories,
      };
    default:
      return state;
  }
}
