import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  FaCommentingO, FaEdit,
  FaTimesCircle } from 'react-icons/lib/fa';
import { convertUnixTimestampToDate } from '../../utils/helpers';
import { disablePost as apiDisablePost } from '../../redux/modules/posts';
import PostVoteScore from '../../containers/PostVoteScore';

const Post = ({
  id,
  category,
  title,
  author,
  timestamp,
  comments,
  disablePost,
  body,
  showBody,
}) => {
  const onDelete = (event) => {
    event.preventDefault();
    disablePost(id, category, comments);
  };
  return (
    <div className="post">
      <PostVoteScore postId={id} />
      <div className="post-content">
        <div className="post-categories">
          <span className="post-category">{category}</span>
        </div>
        <div className="post-title">
          <h2><Link to={`/${category}/${id}`}>{title}</Link></h2>
        </div>
        <div className="post-details">
          <span>{`Posted by ${author} on ${convertUnixTimestampToDate(timestamp)}`}</span>
        </div>
        { showBody && (
          <div className="post-body">
            <p>{body}</p>
          </div>)
        }
        <div className="post-footer">
          <span className="post-comments-count"><FaCommentingO /><a href="">{`${comments ? comments.length : '0'} Comments`}</a></span>
          <span className="post-edit-link"><FaEdit /><Link to={`/posts/${id}/edit`}>{'Edit'}</Link></span>
          <span className="post-delete-link"><FaTimesCircle /><a href="" role="button" tabIndex="0" onClick={onDelete}>{'Delete'}</a></span>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  disablePost: PropTypes.func.isRequired,
  comments: PropTypes.array,
  body: PropTypes.string.isRequired,
  showBody: PropTypes.bool,
};

export default connect(null, { disablePost: apiDisablePost })(Post);
