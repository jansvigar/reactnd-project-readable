import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FaEdit,
  FaTimesCircle } from 'react-icons/lib/fa';
import CommentVoteScore from '../../containers/CommentVoteScore';
import CommentForm from '../CommentForm/CommentForm';
import { toggleCommentEditForm, updateComment, disableComment } from '../../redux/modules/comments';
import { getIsCommentEditFormOpen } from '../../redux/selectors/comments';
import { convertUnixTimestampToDate } from '../../utils/helpers';
import './Comment.css';

const Comment = (props) => {
  const toggleCommentEdit = (event) => {
    if (event) { event.preventDefault(); }
    props.toggleCommentEditForm(props.comment.id);
  };
  const handleDeleteClick = (event) => {
    if (event) { event.preventDefault(); }
    props.disableComment(props.comment.id, props.comment.parentId);
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
              {`${props.comment.author} commented on ${convertUnixTimestampToDate(props.comment.timestamp)}`}
            </div>
            <div className="comment-body">{props.comment.body}</div>
            <div className="comment-footer">
              <span className="comment-edit-link"><FaEdit /><a role="button" tabIndex="0" onClick={toggleCommentEdit}>{'Edit'}</a></span>
              <span className="comment-delete-link"><FaTimesCircle /><a href="" role="button" tabIndex="0" onClick={handleDeleteClick}>{'Delete'}</a></span>
            </div>
          </div>
        )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  updateComment: PropTypes.func,
  disableComment: PropTypes.func,
  isCommentEditFormOpen: PropTypes.bool,
  toggleCommentEditForm: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    isCommentEditFormOpen: getIsCommentEditFormOpen(state, ownProps.comment.id),
  };
}

export default connect(
  mapStateToProps,
  { toggleCommentEditForm, updateComment, disableComment },
)(Comment);
