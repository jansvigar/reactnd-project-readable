import { createSelector } from 'reselect';

const getPostIdsByCategory = (state, category) =>
  (state.postsByCategory[category] ? state.postsByCategory[category].ids : []);
const getPostObjects = state => state.entities.posts;
export const getPost = (state, postId) => state.entities.posts[postId];
export const getIsFetching = (state, category) =>
  (state.postsByCategory[category] ? state.postsByCategory[category].isFetching : true);
export const getErrorMessage = (state, category) =>
  (state.postsByCategory[category] ? state.postsByCategory[category].errorMessage : null);
export const getPostVoteScore = (state, postId) => state.entities.posts[postId].voteScore;
export const getPostCategory = (state, postId) => state.entities.posts[postId].category;
export const getPostComments = (state, postId) => state.entities.posts[postId].comments;
export const getShouldFetch = (state, category) =>
  (state.postsByCategory[category]
    ? state.postsByCategory[category].shouldFetch
    : false);

export const makeGetPostsByCategory = () => createSelector(
  [getPostIdsByCategory, getPostObjects],
  (ids, posts) => ids.map(id => posts[id]),
);

export const getIsCommentAddFormOpen = (state, id) => (
  state.entities.posts[id]
    ? state.entities.posts[id].isCommentAddFormOpen
    : false
);
