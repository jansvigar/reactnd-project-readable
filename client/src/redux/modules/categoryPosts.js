import { combineReducers } from 'redux';
import { FETCHING_POSTS,
  FETCHING_POSTS_SUCCESS,
  FETCHING_POSTS_ERROR,
  ADD_NEW_POST,
  EDIT_POST,
  DELETE_POST,
  SORT_POSTS } from './posts';
/* eslint-disable no-case-declarations */
function categoryPosts(category) {
  const ids = (state = [], action) => {
    switch (action.type) {
      case FETCHING_POSTS_SUCCESS:
        return action.category === category
          ? action.response.result
          : state;
      case ADD_NEW_POST:
        return action.category === category
          ? [...state, action.response.result]
          : state;
      case EDIT_POST:
        if (action.newCategory !== action.currentCategory) {
          return action.newCategory === category
            ? [...state, action.response.result]
            : state.filter(id => id !== action.response.result);
        }
        return state;
      case DELETE_POST:
        return action.category === category
          ? state.filter(id => id !== action.postId)
          : state;
      case SORT_POSTS:
        return action.sortedPosts;
      default:
        return state;
    }
  };
  /* eslint-enable no-case-declarations */

  const isFetching = (state = false, action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case FETCHING_POSTS:
        return true;
      case FETCHING_POSTS_SUCCESS:
      case FETCHING_POSTS_ERROR:
        return false;
      default:
        return state;
    }
  };

  const shouldFetch = (state = true, action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case FETCHING_POSTS_SUCCESS:
        return false;
      case FETCHING_POSTS_ERROR:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case FETCHING_POSTS_SUCCESS:
        return null;
      case FETCHING_POSTS_ERROR:
        return action.error;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
    shouldFetch,
  });
}

export default categoryPosts;
