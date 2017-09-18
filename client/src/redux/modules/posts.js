import { combineReducers } from 'redux';
import categoryPosts from './categoryPosts';
import { sort } from '../../utils/helpers';
import {
  getAllPosts as apiGetAllPosts,
  getPostsByCategory as apiGetPostsByCategory,
  votePost as apiVotePost,
  addNewPost as apiAddNewPost,
  updatePost as apiUpdatePost,
  deletePostById as apiDeletePost,
} from '../../utils/api';
import {
  FETCHING_COMMENTS_SUCCESS,
  TOGGLE_COMMENT_ADD_FORM,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  SORT_COMMENTS,
  fetchAndHandleComments,
  getCommentById } from './comments';

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const FETCHING_POSTS_SUCCESS = 'FETCHING_POSTS_SUCCESS';
export const FETCHING_POSTS_ERROR = 'FETCHING_POSTS_ERROR';
export const ADD_NEW_POST = 'ADD_NEW_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const SORT_POSTS = 'SORT_POSTS';

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

const addNewPost = post => ({
  type: ADD_NEW_POST,
  post,
});

const editPost = post => ({
  type: EDIT_POST,
  post,
});

const deletePost = (postId, category, comments) => ({
  type: DELETE_POST,
  postId,
  category,
  comments,
});

const votePost = (postId, option) => ({
  type: VOTE_POST,
  postId,
  option,
});

const sortPosts = (sortedPosts, category) => ({
  type: SORT_POSTS,
  sortedPosts,
  category,
});


export const votePostById = (postId, option, e) => {
  e.stopPropagation();
  return (dispatch) => {
    const voteUpPost = votePost(postId, 'upVote');
    const voteDownPost = votePost(postId, 'downVote');
    const applyVote = opt => (opt === 'upVote' ? dispatch(voteUpPost) : dispatch(voteDownPost));
    const revertVote = opt => (opt === 'upVote' ? dispatch(voteDownPost) : dispatch(voteUpPost));
    applyVote(option);
    apiVotePost(postId, option)
      .catch(() => {
        revertVote(option);
      });
  };
};

export const fetchAndHandlePosts = category => (dispatch) => {
  dispatch(fetchingPosts(category));
  const getPosts = category === 'all' ? apiGetAllPosts : apiGetPostsByCategory;
  getPosts(category)
    .then((data) => {
      dispatch(fetchingPostsSuccess(data, category));
      data.forEach((post) => {
        dispatch(fetchAndHandleComments(post.id));
      });
    })
    .catch((error) => {
      console.warn(error);
      dispatch(fetchingPostsError(error, category));
    });
};

export const saveNewPost = post => (dispatch) => {
  apiAddNewPost(post)
    .then((data) => {
      dispatch(addNewPost(data));
    })
    .catch(error => console.warn(error));
};

export const disablePost = (postId, category, comments) => (dispatch) => {
  apiDeletePost(postId)
    .then(() => {
      dispatch(deletePost(postId, category, comments));
    })
    .catch(error => console.warn(error));
};

export const updatePost = post => (dispatch) => {
  /* eslint-disable no-debugger */
  apiUpdatePost(post)
    .then((data) => {
      dispatch(editPost(data));
    })
    .catch(error => console.warn(error));
};

export const handleSort = (posts, parentId, sortBy) => (dispatch) => {
  const sortPostsBy = sort(posts);
  switch (sortBy) {
    case 'score_asc':
      dispatch(sortPosts(sortPostsBy('voteScore'), parentId));
      break;
    case 'score_desc':
      dispatch(sortPosts(sortPostsBy('voteScore').reverse(), parentId));
      break;
    case 'timestamp_asc':
      dispatch(sortPosts(sortPostsBy('timestamp'), parentId));
      break;
    case 'timestamp_desc':
      dispatch(sortPosts(sortPostsBy('timestamp').reverse(), parentId));
      break;
    default:
      break;
  }
};

/* eslint no-param-reassign:
  ["error",
    { "props": true,
      "ignorePropertyModificationsFor": ["nextState"] }
  ] */
function byId(state = {}, action) {
  switch (action.type) {
    case FETCHING_POSTS_SUCCESS:
      return action.posts.reduce((nextState, curPost) => {
        nextState[curPost.id] = curPost;
        return nextState;
      }, { ...state });
    case ADD_NEW_POST:
    case EDIT_POST:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          ...action.post,
        },
      };
    case DELETE_POST: {
      const { [action.postId]: omit, ...rest } = state;
      return { ...rest };
    }
    case VOTE_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          voteScore: action.option === 'upVote'
            ? state[action.postId].voteScore + 1
            : state[action.postId].voteScore - 1,
        },
      };
    case FETCHING_COMMENTS_SUCCESS:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: [
            ...action.comments.map(comment => comment.id),
          ],
        },
      };
    case ADD_NEW_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          comments: [
            ...state[action.comment.parentId].comments,
            action.comment.id,
          ],
        },
      };
    case DELETE_COMMENT: {
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: [
            ...state[action.postId].comments.filter(comment => comment !== action.commentId),
          ],
        },
      };
    }
    case TOGGLE_COMMENT_ADD_FORM:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          isCommentAddFormOpen: !state[action.postId].isCommentAddFormOpen,
        },
      };
    case SORT_COMMENTS:
      return {
        ...state,
        [action.parentId]: {
          ...state[action.parentId],
          comments: [...action.sortedComments.map(comment => comment.id)],
        },
      };
    default:
      return state;
  }
}

function byCategories(state = {}, action) {
  switch (action.type) {
    case FETCHING_POSTS_SUCCESS:
    case SORT_POSTS:
      return {
        ...state,
        [action.category]: categoryPosts(action.category)(state[action.category], action),
      };
    case DELETE_POST: {
      const categoryData = action.category
        ? { [action.category]: categoryPosts(action.category)(state[action.category], action) }
        : null;
      return {
        ...state,
        all: categoryPosts('all')(state.all, action),
        ...categoryData,
      };
    }
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
export const getPost = (state, id) => (state.byId[id]);
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
export const getPostVoteScore = (state, id) => (state[id]
  ? state[id].voteScore
  : 0);
export const getCommentsByPost = (state, id) => (
  state.posts.byId[id] && state.posts.byId[id].comments
    ? state.posts.byId[id].comments.map(commentId => (
      getCommentById(state.comments, commentId)))
    : []
);
export const getIsCommentAddFormOpen = (state, id) => (
  state.posts.byId[id]
    ? state.posts.byId[id].isCommentAddFormOpen
    : false
);
