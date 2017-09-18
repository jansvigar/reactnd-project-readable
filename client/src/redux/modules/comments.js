import { DELETE_POST } from './posts';
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

const fetchingComments = () => ({
  type: FETCHING_COMMENTS,
});

const fetchingCommentsSuccess = (comments, postId) => ({
  type: FETCHING_COMMENTS_SUCCESS,
  comments,
  postId,
});

const fetchingCommentsError = error => ({
  type: FETCHING_COMMENTS_ERROR,
  error,
});

const addNewComment = comment => ({
  type: ADD_NEW_COMMENT,
  comment,
});

const editComment = comment => ({
  type: EDIT_COMMENT,
  comment,
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

export const fetchAndHandleComments = postId => (dispatch) => {
  dispatch(fetchingComments());
  apiGetCommentsByPost(postId)
    .then((data) => {
      dispatch(fetchingCommentsSuccess(data, postId));
    })
    .catch((error) => {
      dispatch(fetchingCommentsError(error));
    });
};
/* eslint-disable no-param-reassign */

export const saveNewComment = comment => (dispatch) => {
  apiAddNewComment(comment)
    .then((data) => {
      dispatch(addNewComment(data));
    })
    .catch(error => console.warn(error));
};

export const updateComment = comment => (dispatch) => {
  /* eslint-disable no-debugger */
  apiUpdateComment(comment)
    .then((data) => {
      dispatch(editComment(data));
    })
    .catch(error => console.warn(error));
};

export const disableComment = (commentId, postId) => (dispatch) => {
  apiDeleteComment(commentId)
    .then(() => {
      dispatch(deleteComment(commentId, postId));
    })
    .catch(error => console.warn(error));
};

export default function byId(state = {}, action) {
  switch (action.type) {
    case FETCHING_COMMENTS_SUCCESS:
      return action.comments.reduce((nextState, curComment) => {
        nextState[curComment.id] = curComment;
        return nextState;
      }, { ...state });
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
    case ADD_NEW_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...state[action.comment.id],
          ...action.comment,
        },
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...state[action.comment.id],
          ...action.comment,
        },
      };
    case DELETE_COMMENT: {
      const { [action.commentId]: omit, ...rest } = state;
      return { ...rest };
    }
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
/* eslint-enable no-param-reassign */

export const getCommentVoteScore = (state, id) => (state[id]
  ? state[id].voteScore
  : 0);
export const getCommentById = (state, commentId) => state[commentId];
export const getIsCommentEditFormOpen = (state, commentId) => (
  state[commentId]
    ? state[commentId].isCommentEditFormOpen
    : false);
