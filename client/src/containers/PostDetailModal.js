import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../components/Modal/Modal';
import Post from '../components/Post/Post';
import { openModal, closeModal } from '../redux/modules/modal';
import { getPost } from '../redux/selectors/posts';
import CommentsList from './CommentsList';
import { redirectToReferrerOrHome } from '../utils/helpers';

class PostDetailModal extends Component {
  componentDidMount() {
    this.props.openModal();
  }
  handleCloseModal = () => {
    this.props.closeModal();
    redirectToReferrerOrHome(this.props.location.state, this.props.history);
  }

  render() {
    return (
      <div>
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
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  post: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const postId = ownProps.match.params.id;
  return {
    isOpen: state.ui.modal.isOpen,
    post: getPost(state, postId),
  };
}

export default connect(
  mapStateToProps,
  { openModal, closeModal },
)(PostDetailModal);
