import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

const ErrorMessage = (props) => {
  const { error, onRetry } = props;
  return (
    <div className="errorMessage">
      <p>{error}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
