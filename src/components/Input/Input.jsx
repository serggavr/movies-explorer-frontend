import React from 'react';

import './Input.css'

const Input = ({
  inputName = 'input',
  classNameType = 'input',
  classNamePlaced = 'form',
  inputPlaceholder = 'input',
  inputType = 'text',
  inputError,
  required = 'true'
}) => {
  return (
      <label className={ `input ${ classNamePlaced &&`input_placed_${classNamePlaced }` } input__label ${ classNamePlaced && `input__label_placed_${ classNamePlaced }` }` }>
        {inputName}
        <input type={inputType} className={ `input__field ${ classNamePlaced &&`input__field_placed_${classNamePlaced}` } ${ inputError ? `input__field_type_error` : `` }`} name={ `input__field_type_${classNameType }` } required={required} placeholder={inputPlaceholder} />
      </label>
  );
};

export default Input;