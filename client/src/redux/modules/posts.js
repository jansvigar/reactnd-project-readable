import { combineReducers } from 'redux';
import categoryPosts from './categoryPosts';
import {
  getAllPosts as apiGetAllPosts,
  getPostsByCategory as apiGetPostsByCategory,
} from '../../utils/api';

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const FETCHING_POSTS_SUCCESS = 'FETCHING_POSTS_SUCCESS';
export const FETCHING_POSTS_ERROR = 'FETCHING_POSTS_ERROR';

const fetchingPosts = category => ({
  type: FETCHING_POSTS,
  category,
});

const fetchingPostsSuccess = (data, category) => ({
  type: FETCHING_POSTS_SUCCESS,
  posts: data,
  category,
});

const fetchingPostsError = (error, category) => ({
  type: FETCHING_POSTS_ERROR,
  error: 'Error fetching posts',
  category,
});

export const fetchAndHandlePosts = category => (dispatch) => {
  dispatch(fetchingPosts(category));
  const getPosts = category === 'all' ? apiGetAllPosts : apiGetPostsByCategory;
  getPosts(category)
    .then((data) => {
      dispatch(fetchingPostsSuccess(data, category));
    })
    .catch(error => dispatch(fetchingPostsError(error, category)));
};

/* eslint no-param-reassign:
  ["error",
    { "props": true,
      "ignorePropertyModificationsFor": ["nextState"] }
  ] */
function byId(state = {}, action) {
  switch (action.type) {
    case FETCHING_POSTS_SUCCESS:
      return action.posts.reduce((nextState, post) => {
        nextState[post.id] = post;
        return nextState;
      }, { ...state });
    default:
      return state;
  }
}

function byCategories(state = {}, action) {
  switch (action.type) {
    case FETCHING_POSTS_SUCCESS:
      return {
        ...state,
        [action.category]: categoryPosts(action.category)(state[action.category], action),
      };
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  byCategories,
});

export const getIds = (state, category) => (state.byCategories[category]
  ? state.byCategories[category].ids
  : []);
export const getPost = (state, id) => state.byId[id];
export const getIsFetching = (state, category) => (state.byCategories[category]
  ? state.byCategories[category].isFetching
  : false);
export const getErrorMessage = (state, category) => (state.byCategories[category]
  ? state.byCategories[category].error
  : '');
export const getPostsByCategory = (state, category) => {
  const ids = getIds(state, category);
  return ids ? ids.map(id => getPost(state, id)) : [];
};
