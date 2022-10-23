import React from 'react';
import './Button.css'

const Button = ({
  children,
  className,
  type = 'button'
}) => {
  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
};

export default Button;