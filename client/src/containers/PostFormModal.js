import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../components/Modal/Modal';
import PostForm from '../components/PostForm/PostForm';
import PostsListContainer from '../containers/PostsListContainer';
import { openModal, closeModal } from '../redux/modules/modal';
import { saveNewPost, getPost, updatePost } from '../redux/modules/posts';

class PostFormModal extends Component {
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
          contentLabel="Post Modal"
          closeModal={this.handleCloseModal}
          isOpen={this.props.isOpen}
        >
          <PostForm
            onSavePost={this.props.saveNewPost}
            onUpdatePost={this.props.updatePost}
            initialValues={this.props.initialFormValues}
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
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  saveNewPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  initialFormValues: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    isOpen: state.modal.isOpen,
    initialFormValues: getPost(state.posts, ownProps.match.params.id),
  };
}

export default connect(
  mapStateToProps,
  { openModal, closeModal, saveNewPost, updatePost },
)(PostFormModal);
