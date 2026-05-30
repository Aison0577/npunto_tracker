import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/AuthStore'


export default function ProtectedRoutes({ children, redirectPath = '/', role, optionalRoles = [] }) {
  const { isAuthenticated, user } = useAuth()

  const hasHydrated = useAuth.persist.hasHydrated
  if (!hasHydrated) return null

  const allowedRoles = [role, ...optionalRoles]
  const hasAccess = isAuthenticated && allowedRoles.includes(user.role)

  return hasAccess ? (children || <Outlet />) : <Navigate to={redirectPath} replace />
}
