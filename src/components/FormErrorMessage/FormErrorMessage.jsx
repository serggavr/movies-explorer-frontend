import React from 'react';

import './FormErrorMessage.css'

const FormErrorMessage = ({
  errorMessage
}) => {
  return (
    <span className={`form-error-message ${errorMessage && `form-error-message_visible`}`}>{errorMessage}</span>
  );
};

export default FormErrorMessage;