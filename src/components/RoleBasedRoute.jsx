import React from 'react'
import { Navigate } from 'react-router-dom'

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('hikked_user') || 'null')
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default RoleBasedRoute