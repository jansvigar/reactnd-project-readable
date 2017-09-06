import React from 'react';
import PropTypes from 'prop-types';
import {
  FaCommentingO, FaEdit,
  FaTimesCircle } from 'react-icons/lib/fa';
import PostVoteScore from '../PostVoteScore/PostVoteScore';

const Post = ({
  id,
  category,
  title,
  author,
  timestamp,
}) => (
  <div className="post">
    <PostVoteScore postId={id} />
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
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Post;
