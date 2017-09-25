import { normalize } from 'normalizr';
import { postSchema, postListSchema } from '../../redux/schema';
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
} from './comments';

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

const fetchingPostsSuccess = (response, category) => ({
  type: FETCHING_POSTS_SUCCESS,
  response,
  category,
});

const fetchingPostsError = (error, category) => ({
  type: FETCHING_POSTS_ERROR,
  error: 'Error fetching posts',
  category,
});

const addNewPost = (response, category) => ({
  type: ADD_NEW_POST,
  response,
  category,
});

const editPost = (response, newCategory, currentCategory) => ({
  type: EDIT_POST,
  response,
  newCategory,
  currentCategory,
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

export const fetchAndHandlePosts = category => (dispatch) => {
  dispatch(fetchingPosts(category));
  const getPosts = category === 'all' ? apiGetAllPosts : apiGetPostsByCategory;
  getPosts(category)
    .then((response) => {
      const sortPostsBy = sort(response);
      const sortedResponse = sortPostsBy('voteScore').reverse();
      const normalizedResponse = normalize(sortedResponse, postListSchema);
      dispatch(fetchingPostsSuccess(normalizedResponse, category));
      normalizedResponse.result.map(postId => dispatch(fetchAndHandleComments(postId)));
    },
    error => dispatch(fetchingPostsError(error, category)));
};

export const saveNewPost = post => (dispatch) => {
  const category = post.category;
  apiAddNewPost(post)
    .then(
      (response) => {
        const normalizedResponse = normalize(response, postSchema);
        dispatch(addNewPost(normalizedResponse, category));
      },
      error => error,
    );
};

export const updatePost = (post, initialCategory) => (dispatch) => {
  const newCategory = post.category;
  const currentCategory = initialCategory;
  apiUpdatePost(post)
    .then(
      (response) => {
        const normalizedResponse = normalize(response, postSchema);
        dispatch(editPost(normalizedResponse, newCategory, currentCategory));
      },
      error => error,
    );
};

export const disablePost = (postId, category, comments) => (dispatch) => {
  apiDeletePost(postId)
    .then(
      () => dispatch(deletePost(postId, category, comments)),
      error => error,
    );
};

export const votePostById = (postId, option) => (dispatch) => {
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

export const handleSort = (items, parentId, sortBy) => (dispatch) => {
  const sortPostsBy = sort(items);
  const sortedPostsByVoteScore = sortPostsBy('voteScore').map(post => post.id);
  const sortedPostsByTimestamp = sortPostsBy('timestamp').map(post => post.id);
  switch (sortBy) {
    case 'score_asc':
      dispatch(sortPosts(
        sortedPostsByVoteScore,
        parentId,
      ));
      break;
    case 'score_desc':
      dispatch(sortPosts(
        sortedPostsByVoteScore.reverse(),
        parentId,
      ));
      break;
    case 'timestamp_asc':
      dispatch(sortPosts(
        sortedPostsByTimestamp,
        parentId,
      ));
      break;
    case 'timestamp_desc':
      dispatch(sortPosts(
        sortedPostsByTimestamp.reverse(),
        parentId,
      ));
      break;
    default:
      break;
  }
};

export default function posts(state = {}, action) {
  switch (action.type) {
    case FETCHING_POSTS_SUCCESS:
    case ADD_NEW_POST:
    case EDIT_POST:
      return {
        ...state,
        ...action.response.entities.posts,
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
            ...action.response.result,
          ],
        },
      };
    case ADD_NEW_COMMENT:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: [
            ...state[action.postId].comments,
            action.response.result,
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

const categoryPostsInitialState = {
  all: {
    ids: [],
    isFetching: false,
    errorMessage: null,
    shouldFetch: true,
  },
};

export function postsByCategory(state = categoryPostsInitialState, action) {
  switch (action.type) {
    case FETCHING_POSTS:
    case FETCHING_POSTS_SUCCESS:
    case FETCHING_POSTS_ERROR:
    case SORT_POSTS:
      return {
        ...state,
        [action.category]: categoryPosts(action.category)(state[action.category], action),
      };
    case ADD_NEW_POST:
      return {
        ...state,
        [action.category]: categoryPosts(action.category)(state[action.category], action),
        all: {
          ...state.all,
          ids: [...state.all.ids, action.response.result],
        },
      };
    case EDIT_POST:
      return {
        ...state,
        [action.newCategory]: categoryPosts(action.newCategory)(state[action.newCategory], action),
        [action.currentCategory]: (
          categoryPosts(action.currentCategory)(state[action.currentCategory], action)),
      };
    case DELETE_POST:
      return {
        ...state,
        [action.category]: categoryPosts(action.category)(state[action.category], action),
        all: {
          ...state.all,
          ids: state.all && state.all.ids.filter(id => id !== action.postId),
        },
      };
    default:
      return state;
  }
}
