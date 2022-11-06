import React from 'react';
import './Button.css'

const Button = ({
  children,
  className,
  type = 'button',
  isDisabled,
  onClick,
}) => {

  return (
    <button 
      className={className}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;