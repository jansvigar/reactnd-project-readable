import { getAllCategories } from '../../utils/api';

const FETCHING_CATEGORIES = 'FETCHING_CATEGORIES';
const FETCHING_CATEGORIES_ERROR = 'FETCHING_CATEGORIES_ERROR';
const FETCHING_CATEGORIES_SUCCESS = 'FETCHING_CATEGORIES_SUCCESS';

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

export const fetchAndHandleCategories = () => (dispatch) => {
  dispatch(fetchingCategories());
  getAllCategories()
    .then(data => dispatch(fetchingCategoriesSuccess(data)))
    .catch(error => dispatch(fetchingCategoriesError(error)));
};

const initialState = {
  isFetching: false,
  error: '',
  all: [],
};

export default function categories(state = initialState, action) {
  const type = action.type;

  switch (type) {
    case FETCHING_CATEGORIES :
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_CATEGORIES_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCHING_CATEGORIES_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        all: action.categories,
      };
    default :
      return state;
  }
}
