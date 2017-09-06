import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const PostModal = props => (
  <ReactModal>
    {props.children}
  </ReactModal>
);

PostModal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PostModal;
