import { combineReducers } from 'redux';
import { FETCHING_POSTS,
  FETCHING_POSTS_SUCCESS,
  FETCHING_POSTS_ERROR,
  ADD_NEW_POST,
  DELETE_POST,
  SORT_POSTS } from './posts';
/* eslint-disable no-case-declarations */
function categoryPosts(category) {
  const ids = (state = [], action) => {
    switch (action.type) {
      case FETCHING_POSTS_SUCCESS:
        return action.category === category
          ? action.posts.map(post => post.id)
          : state;
      case ADD_NEW_POST:
        return action.category === category
          ? [...state, action.post.id]
          : state;
      case DELETE_POST:
        return state.filter(id => id !== action.postId);
      case SORT_POSTS:
        const newPosts = action.sortedPosts.map(post => post.id);
        return newPosts;
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

  const errorMessage = (state = '', action) => {
    if (action.category !== category) {
      return state;
    }
    switch (action.type) {
      case FETCHING_POSTS_SUCCESS:
        return '';
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
  });
}

export default categoryPosts;
