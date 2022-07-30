import React from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation()
  const user = localStorage.getItem('loggedInUser')
    ? JSON.parse(localStorage.getItem('loggedInUser'))
    : {}
  return user && user.email ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default ProtectedRoute
