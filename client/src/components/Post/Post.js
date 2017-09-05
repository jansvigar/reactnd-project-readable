import React from 'react';
import PropTypes from 'prop-types';
import {
  FaCaretSquareODown, FaCaretSquareOUp,
  FaCommentingO, FaEdit,
  FaTimesCircle } from 'react-icons/lib/fa';

const Post = ({
  onVoteUpClick,
  onVoteDownClick,
  voteScore,
  category,
  title,
  author,
  timestamp,
}) => (
  <div className="post">
    <div className="post-score">
      <span
        role="button"
        className="vote-control-up"
        tabIndex="0"
        onClick={onVoteUpClick}
      >
        <FaCaretSquareOUp />
      </span>
      <div className="vote-score"><span>{voteScore}</span></div>
      <span
        role="button"
        tabIndex="0"
        className="vote-control-down"
        onClick={onVoteDownClick}
      >
        <FaCaretSquareODown />
      </span>
    </div>
    <div className="post-content">
      <div className="post-categories">
        <span className="post-category">{category}</span>
      </div>
      <div className="post-title">
        <h2>{title}</h2>
      </div>
      <div className="post-details">
        <span>{`Posted by ${author} on ${timestamp}`}</span>
      </div>
      <div className="post-footer">
        <span className="post-comments-count"><FaCommentingO /><a href="">{'4 comments'}</a></span>
        <span className="post-edit-link"><FaEdit /><a href="">{'Edit'}</a></span>
        <span className="post-delete-link"><FaTimesCircle /><a href="">{'Delete'}</a></span>
      </div>
    </div>
  </div>
);

Post.propTypes = {
  onVoteUpClick: PropTypes.func.isRequired,
  onVoteDownClick: PropTypes.func.isRequired,
  voteScore: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Post;
