import { normalize } from 'normalizr';
import { DELETE_POST } from './posts';
import { commentListSchema, commentSchema } from '../schema';
import { sort } from '../../utils/helpers';
import {
  getCommentsByPost as apiGetCommentsByPost,
  voteComment as apiVoteComment,
  addNewComment as apiAddNewComment,
  updateComment as apiUpdateComment,
  deleteCommentById as apiDeleteComment,
} from '../../utils/api';

const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
export const FETCHING_COMMENTS_SUCCESS = 'FETCHING_COMMENTS_SUCCESS';
const FETCHING_COMMENTS_ERROR = 'FETCHING_COMMENTS_ERROR';
const VOTE_COMMENT = 'VOTE_COMMENT';
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const TOGGLE_COMMENT_ADD_FORM = 'TOGGLE_COMMENT_ADD_FORM';
export const TOGGLE_COMMENT_EDIT_FORM = 'TOGGLE_COMMENT_EDIT_FORM';
export const SORT_COMMENTS = 'SORT_COMMENTS';

const fetchingComments = () => ({
  type: FETCHING_COMMENTS,
});

const fetchingCommentsSuccess = (response, postId) => ({
  type: FETCHING_COMMENTS_SUCCESS,
  response,
  postId,
});

const fetchingCommentsError = error => ({
  type: FETCHING_COMMENTS_ERROR,
  error,
});

const addNewComment = (response, postId) => ({
  type: ADD_NEW_COMMENT,
  response,
  postId,
});

const editComment = (response, postId) => ({
  type: EDIT_COMMENT,
  response,
  postId,
});

const deleteComment = (commentId, postId) => ({
  type: DELETE_COMMENT,
  commentId,
  postId,
});

const voteComment = (commentId, option) => ({
  type: VOTE_COMMENT,
  commentId,
  option,
});

export const toggleCommentAddForm = postId => ({
  type: TOGGLE_COMMENT_ADD_FORM,
  postId,
});

export const toggleCommentEditForm = commentId => ({
  type: TOGGLE_COMMENT_EDIT_FORM,
  commentId,
});

export const sortComments = (sortedComments, parentId) => ({
  type: SORT_COMMENTS,
  sortedComments,
  parentId,
});

export const fetchAndHandleComments = postId => (dispatch) => {
  dispatch(fetchingComments());
  apiGetCommentsByPost(postId)
    .then((response) => {
      const normalizedResponse = normalize(response, commentListSchema);
      dispatch(fetchingCommentsSuccess(normalizedResponse, postId));
    },
    error => dispatch(fetchingCommentsError(error)));
};

export const saveNewComment = (comment, parentId) => (dispatch) => {
  apiAddNewComment(comment)
    .then(
      (response) => {
        const normalizedResponse = normalize(response, commentSchema);
        dispatch(addNewComment(normalizedResponse, parentId));
      },
      error => error,
    );
};

export const updateComment = (comment, parentId) => (dispatch) => {
  apiUpdateComment(comment)
    .then(
      (response) => {
        const normalizedResponse = normalize(response, commentSchema);
        dispatch(editComment(normalizedResponse, parentId));
      },
      error => error,
    );
};

export const disableComment = (commentId, postId) => (dispatch) => {
  apiDeleteComment(commentId)
    .then(
      () => dispatch(deleteComment(commentId, postId)),
      error => error,
    );
};

export const voteCommentById = (commentId, option) => (dispatch) => {
  const voteUpComment = voteComment(commentId, 'upVote');
  const voteDownComment = voteComment(commentId, 'downVote');
  const applyVote = opt => (opt === 'upVote' ? dispatch(voteUpComment) : dispatch(voteDownComment));
  const revertVote = opt => (opt === 'upVote' ? dispatch(voteDownComment) : dispatch(voteUpComment));
  applyVote(option);
  apiVoteComment(commentId, option)
    .catch(() => {
      revertVote(option);
    });
};

export const handleSort = (items, parentId, sortBy) => (dispatch) => {
  const sortCommentsBy = sort(items);
  const sortedCommentsByVoteScore = sortCommentsBy('voteScore');
  const sortedCommentsByTimestamp = sortCommentsBy('timestamp');
  switch (sortBy) {
    case 'score_asc':
      dispatch(sortComments(
        sortedCommentsByVoteScore,
        parentId,
      ));
      break;
    case 'score_desc':
      dispatch(sortComments(
        sortedCommentsByVoteScore.reverse(),
        parentId,
      ));
      break;
    case 'timestamp_asc':
      dispatch(sortComments(
        sortedCommentsByTimestamp,
        parentId,
      ));
      break;
    case 'timestamp_desc':
      dispatch(sortComments(
        sortedCommentsByTimestamp.reverse(),
        parentId,
      ));
      break;
    default:
      break;
  }
};

export default function comments(state = {}, action) {
  switch (action.type) {
    case FETCHING_COMMENTS_SUCCESS:
    case ADD_NEW_COMMENT:
    case EDIT_COMMENT:
      return {
        ...state,
        ...action.response.entities.comments,
      };
    case DELETE_COMMENT: {
      const { [action.commentId]: omit, ...rest } = state;
      return { ...rest };
    }
    case VOTE_COMMENT:
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          voteScore: action.option === 'upVote'
            ? state[action.commentId].voteScore + 1
            : state[action.commentId].voteScore - 1,
        },
      };
    case DELETE_POST: {
      const newState = { ...state };
      action.comments.forEach(comment => delete newState[comment]);
      return newState;
    }
    case TOGGLE_COMMENT_EDIT_FORM:
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          isCommentEditFormOpen: !state[action.commentId].isCommentEditFormOpen,
        },
      };
    default:
      return state;
  }
}
