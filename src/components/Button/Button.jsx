import React from 'react';
import './Button.css'

const Button = ({
  children,
  className,
  type = 'button',
  isLoading,
  onClick,
}) => {

  return (
    <button 
      className={className}
      type={type}
      disabled={isLoading}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

//// в КардЛист добавить стейт кнопки и выводить кнопку через стейт, удалить css hidden