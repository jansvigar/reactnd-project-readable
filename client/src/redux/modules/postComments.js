import { combineReducers } from 'redux';
import {
  FETCHING_COMMENTS,
  FETCHING_COMMENTS_SUCCESS,
  FETCHING_COMMENTS_ERROR,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  SORT_COMMENTS,
} from './comments';

function postComments(postId) {
  const ids = (state = [], action) => {
    switch (action.type) {
      case FETCHING_COMMENTS_SUCCESS:
        return action.postId === postId
          ? action.response.result
          : state;
      case ADD_NEW_COMMENT:
        return action.postId === postId
          ? [...state, action.response.result]
          : state;
      case DELETE_COMMENT:
        return action.postId === postId
          ? state.filter(id => id !== action.commentId)
          : state;
      case SORT_COMMENTS:
        return action.postId === postId
          ? action.sortedComments.map(comment => comment.id)
          : state;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.postId !== postId) {
      return state;
    }

    switch (action.type) {
      case FETCHING_COMMENTS:
        return true;
      case FETCHING_COMMENTS_SUCCESS:
      case FETCHING_COMMENTS_ERROR:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.postId !== postId) {
      return state;
    }

    switch (action.type) {
      case FETCHING_COMMENTS_SUCCESS:
        return null;
      case FETCHING_COMMENTS_ERROR:
        return action.error;
      default:
        return state;
    }
  };

  const shouldFetch = (state = true, action) => {
    if (action.postId !== postId) {
      return state;
    }

    switch (action.type) {
      case FETCHING_COMMENTS_SUCCESS:
        return false;
      case FETCHING_COMMENTS_ERROR:
        return false;
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

export default postComments;
