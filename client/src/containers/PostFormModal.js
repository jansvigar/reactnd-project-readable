import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import Modal from '../components/Modal/Modal';
import PostForm from '../components/PostForm/PostForm';
import { openPostModal, closePostModal } from '../redux/modules/modal';
import { saveNewPost, updatePost } from '../redux/modules/posts';
import { getPost } from '../redux/selectors/posts';
import { getPostModalOpen } from '../redux/selectors/ui';
import { redirectToReferrerOrHome } from '../utils/helpers';

class PostFormModal extends Component {
  componentDidMount() {
    this.props.openPostModal();
  }

  onSavePost = (values) => {
    const newPostData = {
      id: v4(),
      timestamp: Date.now(),
      ...values,
    };
    this.props.saveNewPost(newPostData);
    redirectToReferrerOrHome(this.props.location.state, this.props.history);
  }

  onUpdatePost = (values) => {
    const initialCategory = this.props.initialFormValues.category;
    this.props.updatePost(values, initialCategory);
    redirectToReferrerOrHome(this.props.location.state, this.props.history);
  }

  handleCloseModal = () => {
    this.props.closePostModal();
    redirectToReferrerOrHome(this.props.location.state, this.props.history);
  }

  render() {
    return (
      <div>
        <Modal
          contentLabel="Post Modal"
          closeModal={this.handleCloseModal}
          isOpen={this.props.postModalOpen}
        >
          <PostForm
            onSavePost={this.onSavePost}
            onUpdatePost={this.onUpdatePost}
            initialValues={this.props.initialFormValues}
            match={this.props.match}
          />
        </Modal>
      </div>
    );
  }
}

PostFormModal.propTypes = {
  openPostModal: PropTypes.func.isRequired,
  closePostModal: PropTypes.func.isRequired,
  postModalOpen: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object,
  match: PropTypes.object,
  saveNewPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  initialFormValues: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const postId = ownProps.match.params.id;
  return {
    postModalOpen: getPostModalOpen(state),
    initialFormValues: getPost(state, postId),
  };
}

export default connect(
  mapStateToProps,
  { openPostModal, closePostModal, saveNewPost, updatePost },
)(PostFormModal);
