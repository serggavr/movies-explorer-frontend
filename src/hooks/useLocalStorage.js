import React from "react"

// export const useLocalStorage = (initialValue, storageName) => {
//   const getValue = () => {
//     const storage = localStorage.getItem(storageName)
//     if (storage) {
//       return JSON.parse(storage)
//     }
//     return initialValue
//   }

//   const [value, setValue] = React.useState(getValue)

//   React.useEffect(() => {
//     if (value.length > 0) {
//       localStorage.setItem(storageName, JSON.stringify(value))
//     }
    
//   }, [value])
  
//   return [value, setValue]
// }

export const useLocalStorage = (initialValue, storageName) => {
  const getValue = () => {
    const storage = localStorage.getItem(storageName)
    if (storage) {
      return JSON.parse(storage)
    }
    return initialValue
  }

  const [value, setValue] = React.useState(getValue)

  React.useEffect(() => {
    localStorage.setItem(storageName, JSON.stringify(value))
  }, [value])
  
  return [value, setValue]
}