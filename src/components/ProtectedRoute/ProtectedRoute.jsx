import React from 'react';
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children, isLoggedIn, isLoggedIn2}) {

  if (!isLoggedIn) {
    return <Navigate replace to='/' />
  }

  return children
}