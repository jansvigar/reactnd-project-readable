import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../components/Modal/Modal';
import Post from '../components/Post/Post';
import PostsListContainer from './PostsListContainer';
import { openModal, closeModal } from '../redux/modules/modal';
import { getPost } from '../redux/modules/posts';
import CommentsList from './CommentsList';

class PostDetailModal extends Component {
  componentDidMount() {
    this.props.openModal();
  }
  handleCloseModal = () => {
    this.props.closeModal();
    this.props.history.push('/');
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
            {this.props.post && (
              <div>
                <Post {...this.props.post} showBody />
                <CommentsList postId={this.props.post.id} />
              </div>
            )}
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
};

function mapStateToProps(state, ownProps) {
  return {
    isOpen: state.modal.isOpen,
    post: getPost(state.posts, ownProps.match.params.id),
  };
}

export default connect(
  mapStateToProps,
  { openModal, closeModal },
)(PostDetailModal);
