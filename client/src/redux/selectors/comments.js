import { createSelector } from 'reselect';

const getCommentIdsByPost = (state, postId) =>
  (state.commentsByPost[postId]
    ? state.commentsByPost[postId].ids
    : []);
const getCommentObjects = state => state.entities.comments;
export const getCommentsByPost = createSelector(
  [getCommentIdsByPost, getCommentObjects],
  (ids, comments) => ids.map(id => comments[id]),
);

export const getCommentVoteScore = (state, id) => (state.entities.comments[id]
  ? state.entities.comments[id].voteScore
  : 0);
export const getCommentById = (state, commentId) => state.entities.comments[commentId];
export const getIsCommentEditFormOpen = (state, commentId) => (
  state.entities.comments[commentId]
    ? state.entities.comments[commentId].isCommentEditFormOpen
    : false);
export const getIsFetching = (state, postId) => (
  state.commentsByPost[postId]
    ? state.commentsByPost[postId].isFetching
    : false
);
export const getErrorMessage = (state, postId) => (
  state.commentsByPost[postId]
    ? state.commentsByPost[postId].errorMessage
    : null
);
