import React from 'react';

import './FormErrorMessage.css'

const FormErrorMessage = ({
  inputWithErrorName,
  errorMessage
}) => {
  return (
    <span className={`form-error-message ${errorMessage && `form-error-message_visible`}`}>{`${inputWithErrorName}: ${errorMessage}`}</span>
  );
};

export default FormErrorMessage;