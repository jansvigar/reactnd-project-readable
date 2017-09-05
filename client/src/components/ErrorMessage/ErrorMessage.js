import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
  const { error, onRetry } = props;
  return (<div className="errorMessage">
    <p>{error}</p>
    <button onRetry={onRetry}>Retry</button>
  </div>);
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorMessage;
