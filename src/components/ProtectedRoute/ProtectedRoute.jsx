import React from 'react';
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children, isLoggedIn, isLoggedIn2}) {

  // const [logged, setLogged] = React.useState(isLoggedIn)

  // React.useEffect(() => {
  //   console.log(logged)
  // }, [logged])
  //   console.log(isLoggedIn2)

  //   React.useEffect(() => {
  //     console.log(isLoggedIn2)
  //   }, [isLoggedIn2])
 

  if (!isLoggedIn) {
    return <Navigate replace to='/signin' />
  }

  return children
}