import React from 'react';

import './ErrorPopup.css'

const ErrorPopup = ({
  isErrorPopupOpen,
  errorMessage,
  handleOpenErrorPopup,
}) => {


  return (
    <div 
      className={`error-popup ${isErrorPopupOpen ? `error-popup_visible` : ``}`}
      onClick={handleOpenErrorPopup}
    >
      <div className="error-popup__container">
        <p className='error-popup__message'>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;