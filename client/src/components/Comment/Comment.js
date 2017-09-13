import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  FaEdit,
  FaTimesCircle } from 'react-icons/lib/fa';
import CommentVoteScore from '../../containers/CommentVoteScore';
import { convertUnixTimestampToDate } from '../../utils/helpers';
import './Comment.css';

const Comment = props => (
  <div className="comment">
    <CommentVoteScore commentId={props.comment.id} />
    <div className="comment-content">
      <div className="comment-header">
        {`${props.comment.author} commented on ${convertUnixTimestampToDate(props.comment.timestamp)}`}
      </div>
      <div className="comment-body">{props.comment.body}</div>
      <div className="comment-footer">
        <span className="comment-edit-link"><FaEdit /><Link to={`/comments/${props.comment.id}/edit`}>{'Edit'}</Link></span>
        <span className="comment-delete-link"><FaTimesCircle /><a href="" role="button" tabIndex="0" onClick={props.onDelete}>{'Delete'}</a></span>
      </div>
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Comment;
