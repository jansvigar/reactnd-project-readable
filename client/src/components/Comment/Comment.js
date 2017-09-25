import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FaEdit,
  FaTimesCircle,
  FaUser } from 'react-icons/lib/fa';
import CommentVoteScore from '../../containers/CommentVoteScore';
import CommentForm from '../CommentForm/CommentForm';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { toggleCommentEditForm, updateComment, disableComment } from '../../redux/modules/comments';
import { getIsCommentEditFormOpen } from '../../redux/selectors/comments';
import { getConfirmDeleteCommentModalOpen } from '../../redux/selectors/ui';
import { openConfirmDeleteCommentModal, closeConfirmDeleteCommentModal } from '../../redux/modules/modal';
import { convertUnixTimestampToDate } from '../../utils/helpers';
import './Comment.css';

const Comment = (props) => {
  const toggleCommentEdit = (event) => {
    if (event) { event.preventDefault(); }
    props.toggleCommentEditForm(props.comment.id);
  };
  const handleDeleteClick = (event) => {
    if (event) { event.preventDefault(); }
    props.openConfirmDeleteCommentModal();
  };
  const onConfirm = () => {
    props.disableComment(props.comment.id, props.comment.parentId);
    props.closeConfirmDeleteCommentModal();
  };
  return (
    <div className="comment">
      <CommentVoteScore commentId={props.comment.id} />
      {props.isCommentEditFormOpen
        ? (<div className="comment-content">
          <CommentForm
            commentId={props.comment.id}
            initialValues={props.comment}
            onUpdateComment={props.updateComment}
            onToggleCommentEdit={toggleCommentEdit}
          /></div>)
        : (
          <div className="comment-content">
            <div className="comment-header">
              <FaUser />{` ${props.comment.author} commented on ${convertUnixTimestampToDate(props.comment.timestamp)}`}
            </div>
            <div className="comment-body">{props.comment.body}</div>
            <div className="comment-footer">
              <span className="comment-edit-link"><FaEdit /><a role="button" tabIndex="0" onClick={toggleCommentEdit}>{'Edit'}</a></span>
              <span className="comment-delete-link"><FaTimesCircle /><a href="" role="button" tabIndex="0" onClick={handleDeleteClick}>{'Delete'}</a></span>
            </div>
          </div>
        )}
      <ConfirmModal
        message="Are you sure you want to delete this comment?"
        isOpen={props.confirmDeleteCommentModalOpen}
        onConfirm={onConfirm}
        onClose={props.closeConfirmDeleteCommentModal}
      />
    </div>

  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  updateComment: PropTypes.func.isRequired,
  disableComment: PropTypes.func.isRequired,
  isCommentEditFormOpen: PropTypes.bool,
  toggleCommentEditForm: PropTypes.func,
  confirmDeleteCommentModalOpen: PropTypes.bool.isRequired,
  openConfirmDeleteCommentModal: PropTypes.func.isRequired,
  closeConfirmDeleteCommentModal: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isCommentEditFormOpen: getIsCommentEditFormOpen(state, ownProps.comment.id),
    confirmDeleteCommentModalOpen: getConfirmDeleteCommentModalOpen(state),
  };
}

export default connect(
  mapStateToProps,
  { toggleCommentEditForm,
    updateComment,
    disableComment,
    openConfirmDeleteCommentModal,
    closeConfirmDeleteCommentModal },
)(Comment);
