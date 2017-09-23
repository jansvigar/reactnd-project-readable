import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  FaCommentingO, FaEdit,
  FaTimesCircle } from 'react-icons/lib/fa';

const PostFooter = (props) => {
  const onDelete = (event) => {
    event.preventDefault();
    props.disablePost(props.postId, props.category, props.comments);
  };
  return (
    <div className="post-footer">
      <span className="post-comments-count">
        <FaCommentingO />
        <a href="">{`${props.comments ? props.comments.length : '0'} Comments`}</a>
      </span>
      <span className="post-edit-link">
        <FaEdit />
        <Link to={{
          pathname: `/posts/${props.postId}/edit`,
          state: { prevPath: props.location, prevMatch: props.match },
        }}
        >{'Edit'}
        </Link>
      </span>
      <span className="post-delete-link">
        <FaTimesCircle />
        <a href="" role="button" tabIndex="0" onClick={onDelete}>
          {'Delete'}
        </a>
      </span>
    </div>
  );
};

PostFooter.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string,
  category: PropTypes.string,
  disablePost: PropTypes.func,
  match: PropTypes.object,
  location: PropTypes.object,
};

export default PostFooter;
