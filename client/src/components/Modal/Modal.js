import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    borderRadius: '8px',
    bottom: 'auto',
    minHeight: '30rem',
    left: '50%',
    padding: '2rem',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '20rem',
    width: '80%',
    maxWidth: '40rem',
    boxShadow: '0.5px 0.5px 0.5px 0.6px rgba(0, 0, 0, .2)',
    backgroundColor: 'rgba(249, 249, 249, 1)',
  },
};

const Modal = props => (
  <ReactModal
    isOpen={props.isOpen}
    onRequestClose={props.closeModal}
    contentLabel={props.contentLabel}
    style={customStyles}
  >
    {props.children}
  </ReactModal>
);

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  contentLabel: PropTypes.string.isRequired,
};

export default Modal;
