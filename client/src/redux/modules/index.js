import { combineReducers } from 'redux';
import categories from './categories';
import posts from './posts';
import comments from './comments';
import modal from './modal';

export const entities = combineReducers({
  categories,
  posts,
  comments,
});

export const ui = combineReducers({
  modal,
});

export { allCategories } from './categories';
export { postsByCategory } from './posts';
export { commentsByPost } from './comments';
