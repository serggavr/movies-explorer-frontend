import React from "react"

export const useDefaultInputValidation = () => {
  const [validationMessage, setValidationMessage] = React.useState('')
  const [isValid, setIsValid] = React.useState(true)
  const onChange = (e) => {
    if (e.target.validationMessage) {
      setValidationMessage(e.target.validationMessage)
      setIsValid(false)
    } else {
      setValidationMessage('')
      setIsValid(true)
    }
  }
  const resetError = () => {
    setValidationMessage('')
    setIsValid(true)
  }
  return {
    validationMessage,
    isValid,
    onChange,
    resetError
  }
}