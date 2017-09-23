import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import Modal from '../components/Modal/Modal';
import PostForm from '../components/PostForm/PostForm';
import { openModal, closeModal } from '../redux/modules/modal';
import { saveNewPost, updatePost } from '../redux/modules/posts';
import { getPost } from '../redux/selectors/posts';
import { redirectToReferrerOrHome } from '../utils/helpers';

class PostFormModal extends Component {
  componentDidMount() {
    this.props.openModal();
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
    this.props.closeModal();
    redirectToReferrerOrHome(this.props.location.state, this.props.history);
  }

  render() {
    return (
      <div>
        <Modal
          contentLabel="Post Modal"
          closeModal={this.handleCloseModal}
          isOpen={this.props.isOpen}
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
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
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
    isOpen: state.ui.modal.isOpen,
    initialFormValues: getPost(state, postId),
  };
}

export default connect(
  mapStateToProps,
  { openModal, closeModal, saveNewPost, updatePost },
)(PostFormModal);
