import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import './ConfirmModal.css';

class ConfirmModal extends Component {
  handleCloseModal = () => {
    this.props.onClose();
  }
  render() {
    return (
      <div>
        <Modal
          contentLabel="Confirm Modal"
          hideCloseButton
          isOpen={this.props.isOpen}
        >
          <div className="confirm-modal">
            <p className="confirm-modal-message">{this.props.message || 'Are you sure?'}</p>
            <div className="confirm-modal-button-group">
              <button type="button" onClick={this.props.onConfirm}>
              Yes
              </button>
              <button type="button" onClick={this.handleCloseModal}>
              Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default ConfirmModal;
