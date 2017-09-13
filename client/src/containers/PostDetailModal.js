import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../components/Modal/Modal';
import Post from '../components/Post/Post';
import PostsListContainer from './PostsListContainer';
import { openModal, closeModal } from '../redux/modules/modal';
import { getPost, getCommentsByPost } from '../redux/modules/posts';
import Comment from '../components/Comment/Comment';

class PostDetailModal extends Component {
  componentDidMount() {
    this.props.openModal();
  }
  handleCloseModal = () => {
    this.props.closeModal();
    this.props.history.push('/');
  }
  handleCommentDelete = () => {
    console.log('comment deleted');
  }
  render() {
    return (
      <div>
        <PostsListContainer match={this.props.match} />
        <Modal
          contentLabel="Post Detail Modal"
          closeModal={this.handleCloseModal}
          isOpen={this.props.isOpen}
        >
          <div>
            {this.props.post && <Post {...this.props.post} showBody />}
            <h3>Comments</h3>
            {this.props.comments.length
              ? this.props.comments.map(comment => (
                <div key={comment.id}>
                  <Comment comment={comment} onDelete={this.handleCommentDelete} />
                </div>
              ))
              : <div>{'There is no comment for this post yet'}</div>
            }
          </div>
        </Modal>
      </div>
    );
  }
}

PostDetailModal.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  post: PropTypes.object,
  comments: PropTypes.array,
};

function mapStateToProps(state, ownProps) {
  return {
    isOpen: state.modal.isOpen,
    post: getPost(state.posts, ownProps.match.params.id),
    comments: getCommentsByPost(state, ownProps.match.params.id),
  };
}

export default connect(
  mapStateToProps,
  { openModal, closeModal },
)(PostDetailModal);
