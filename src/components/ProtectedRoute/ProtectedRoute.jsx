import React from 'react';
import { Navigate, Route } from 'react-router-dom'

export default function ProtectedRoute({children, loggedIn}) {
  if (!loggedIn) {
    return <Navigate replace to="/signin" />
  }

  return children
}