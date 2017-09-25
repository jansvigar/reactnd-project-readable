import { combineReducers } from 'redux';

const OPEN_POST_MODAL = 'OPEN_POST_MODAL';
const CLOSE_POST_MODAL = 'CLOSE_POST_MODAL';
const OPEN_CONFIRM_DELETE_POST_MODAL = 'OPEN_CONFIRM_DELETE_POST_MODAL';
const CLOSE_CONFIRM_DELETE_POST_MODAL = 'CLOSE_CONFIRM_DELETE_POST_MODAL';
const OPEN_CONFIRM_DELETE_COMMENT_MODAL = 'OPEN_CONFIRM_DELETE_COMMENT_MODAL';
const CLOSE_CONFIRM_DELETE_COMMENT_MODAL = 'CLOSE_CONFIRM_DELETE_COMMENT_MODAL';

export const openPostModal = () => ({
  type: OPEN_POST_MODAL,
});

export const closePostModal = () => ({
  type: CLOSE_POST_MODAL,
});

export const openConfirmDeletePostModal = () => ({
  type: OPEN_CONFIRM_DELETE_POST_MODAL,
});

export const closeConfirmDeletePostModal = () => ({
  type: CLOSE_CONFIRM_DELETE_POST_MODAL,
});

export const openConfirmDeleteCommentModal = () => ({
  type: OPEN_CONFIRM_DELETE_COMMENT_MODAL,
});

export const closeConfirmDeleteCommentModal = () => ({
  type: CLOSE_CONFIRM_DELETE_COMMENT_MODAL,
});

function postModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_POST_MODAL:
      return true;
    case CLOSE_POST_MODAL:
      return false;
    default:
      return state;
  }
}

function confirmDeletePostModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_CONFIRM_DELETE_POST_MODAL:
      return true;
    case CLOSE_CONFIRM_DELETE_POST_MODAL:
      return false;
    default:
      return state;
  }
}

function confirmDeleteCommentModalOpen(state = false, action) {
  switch (action.type) {
    case OPEN_CONFIRM_DELETE_COMMENT_MODAL:
      return true;
    case CLOSE_CONFIRM_DELETE_COMMENT_MODAL:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  postModalOpen,
  confirmDeletePostModalOpen,
  confirmDeleteCommentModalOpen,
});
