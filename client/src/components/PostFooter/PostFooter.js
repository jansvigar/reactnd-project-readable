import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  FaCommentingO, FaEdit,
  FaTimesCircle } from 'react-icons/lib/fa';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import './PostFooter.css';

const PostFooter = (props) => {
  const onDelete = (event) => {
    event.preventDefault();
    props.openConfirmDeletePostModal();
    // props.disablePost(props.postId, props.category, props.comments);
  };
  const handleDelete = () => {
    props.disablePost(props.postId, props.category, props.comments);
    props.closeConfirmDeletePostModal();
    if (props.showBody) props.history.push('/');
  };
  return (
    <div className="post-footer">
      <span className="post-comments-count">
        <FaCommentingO />
        <span href="">{`${props.comments ? props.comments.length : '0'} Comments`}</span>
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
      <ConfirmModal
        message="Are you sure you want to delete this post?"
        isOpen={props.confirmDeletePostModalOpen}
        onConfirm={handleDelete}
        onClose={props.closeConfirmDeletePostModal}
      />
    </div>
  );
};

PostFooter.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  disablePost: PropTypes.func.isRequired,
  confirmDeletePostModalOpen: PropTypes.bool,
  openConfirmDeletePostModal: PropTypes.func,
  closeConfirmDeletePostModal: PropTypes.func,
  showBody: PropTypes.bool,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default PostFooter;
