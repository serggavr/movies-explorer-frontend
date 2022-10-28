import React from "react"

// export const useMoviesFilter = (value, field, array, duration) => {
//   const [arrayForFiltering, setArrayForFiltering] = React.useState(array ?? [])
//   const [filteredQueryField, setFilteredField] = React.useState(field ?? '')
//   const [filterQueryValue, setFilterQueryValue] = React.useState(value ?? '')
//   const [filterDurationValue, setFilterDurationValue] = React.useState(duration ?? 0)
//   const [isLoading, setIsLoading] = React.useState(false)

//   const filterByQuery = () => {
//     let filteredArray = []
//     if (filterQueryValue) {
//       filteredArray = arrayForFiltering.filter(item => item[filteredQueryField].toLowerCase().includes(filterQueryValue.toLowerCase()))
//       if (filterDurationValue > 0) {
//         return filteredArray.filter(item => item.duration <= filterDurationValue)
//       }
//     }
//     return filteredArray
//   }
//   const [filteredArray, setFilteredArray] = React.useState(filterByQuery)

//   React.useEffect(() => {
//       setFilteredArray(filterByQuery)
//   }, [arrayForFiltering, filterQueryValue, filterDurationValue])

//   React.useEffect(() => {
//     setIsLoading(true)
// }, [filteredArray])

//   return [filteredArray, setArrayForFiltering, setFilteredField, setFilterQueryValue, setFilterDurationValue, isLoading]
// }

export const useMoviesFilter = (value, queryField, array, duration, durationField) => {
  const [arrayForFiltering, setArrayForFiltering] = React.useState(array ?? [])
  const [filteredQueryField, setFilteredQueryField] = React.useState(queryField ?? '')
  const [filterQueryValue, setFilterQueryValue] = React.useState(value ?? '')
  const [filteredDurationField, setFilteredDurationField] = React.useState(durationField ?? '')
  const [filterDurationValue, setFilterDurationValue] = React.useState(duration ?? 0)

  const filterByQuery = () => {
    let filteredArray = []
    if (filterQueryValue) {
      filteredArray = arrayForFiltering.filter(item => item[filteredQueryField].toLowerCase().includes(filterQueryValue.toLowerCase()))
      if (filterDurationValue > 0) {
        return filteredArray.filter(item => item[filteredDurationField] <= filterDurationValue)
      }
    }
    return filteredArray
  }
  const [filteredArray, setFilteredArray] = React.useState(filterByQuery)

  React.useEffect(() => {
      setFilteredArray(filterByQuery)
  }, [arrayForFiltering, filterQueryValue, filterDurationValue])

  return [filteredArray, setArrayForFiltering, setFilteredQueryField, setFilterQueryValue, setFilterDurationValue, setFilteredDurationField]
}