import React from 'react';

import './Input.css'

const Input = ({
  inputName = 'input',
  classNameType = 'input',
  classNamePlaced = 'form',
  inputPlaceholder = 'input',
  inputType = 'text',
  inputError,
  required = 'true',
  minLength = "0",
  maxLength = "40",

  onChange,
  value,
  onFocus = null
}) => {
  return (
    <label className={`input ${classNamePlaced && `input_placed_${classNamePlaced}`} input__label ${classNamePlaced && `input__label_placed_${classNamePlaced}`}`}>
      {inputName}
      <input
        type={inputType}
        className={`input__field ${classNamePlaced && `input__field_placed_${classNamePlaced}`} ${!inputError ? `input__field_type_error` : ``}`}
        name={`input__field_type_${classNameType}`} required={required} placeholder={inputPlaceholder}
        minLength={minLength}
        maxLength={maxLength}

        onChange={onChange}
        value={value}
        onFocus={onFocus}
      />
    </label>
  );
};

export default Input;