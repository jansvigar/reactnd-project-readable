import {
  getCommentsByPost as apiGetCommentsByPost,
  voteComment as apiVoteComment,
} from '../../utils/api';

const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
export const FETCHING_COMMENTS_SUCCESS = 'FETCHING_COMMENTS_SUCCESS';
const FETCHING_COMMENTS_ERROR = 'FETCHING_COMMENTS_ERROR';
const VOTE_COMMENT = 'VOTE_COMMENT';

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

const voteComment = (commentId, option) => ({
  type: VOTE_COMMENT,
  commentId,
  option,
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
    default:
      return state;
  }
}
/* eslint-enable no-param-reassign */

export const getCommentVoteScore = (state, id) => (state[id]
  ? state[id].voteScore
  : 0);
export const getCommentById = (state, commentId) => (state[commentId]);
