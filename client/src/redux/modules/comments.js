import { getCommentsByPost } from '../../utils/api';

const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
export const FETCHING_COMMENTS_SUCCESS = 'FETCHING_COMMENTS_SUCCESS';
const FETCHING_COMMENTS_ERROR = 'FETCHING_COMMENTS_ERROR';

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

export const fetchAndHandleComments = postId => (dispatch) => {
  dispatch(fetchingComments());
  getCommentsByPost(postId)
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
    default:
      return state;
  }
}
/* eslint-enable no-param-reassign */
