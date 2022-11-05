import React from "react"
import { validate as emailValidator} from "react-email-validator"
import { nameValidator, inputEmailCustomError, inputNameCustomError } from "../utils/constants"

export const useCustomInputValidation = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [inputType, setInputType] = React.useState('')
  const [validationMessage, setValidationMessage] = React.useState('')
  const [isValid, setIsValid] = React.useState(true)

  const resetError = () => {
    setValidationMessage('')
    setIsValid(true)
  }
  
  const onChange = (e) => {
      setInputType(e.target.type)
      setInputValue(e.target.value)
      if (inputType !== 'email' && inputType !== 'text') {
        setValidationMessage(e.target.validationMessage)
      }
  }

  React.useEffect(() => {
    if (inputType === 'email') {
      setIsValid(emailValidator(inputValue))
    }
    if (inputType === 'text') {
      setIsValid(nameValidator(inputValue))
    }
    if (inputType !== 'email' && inputType !== 'text') {
      setIsValid(!validationMessage)
    }
  }, [inputValue])

  React.useEffect(() => {
    if (inputType === 'email') {
      if (!isValid) {
        setValidationMessage(inputValue === '' ? 'Обязательно для заполнения' : inputEmailCustomError)
      } else {
        setValidationMessage('')
      }
    }
    if (inputType === 'text') {
      if (!isValid) {
        setValidationMessage(inputValue === '' ? 'Обязательно для заполнения' : inputValue.length < 2 || inputValue.length > 30 ? 'Длинна имени должна быть от 2 до 30 символов' : inputNameCustomError)
      } 
      else {
        setValidationMessage('')
      }
    }

  }, [isValid, inputValue])
  
  return {
    validationMessage,
    isValid,
    onChange,
    resetError,
    setInputValue
  }
}