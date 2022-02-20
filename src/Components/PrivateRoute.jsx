import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export default function PrivateRoute ({ children }) {
  const auth = useAuth()
  const { loggedInUser } = auth

  return loggedInUser?.username ? children : <Navigate to="/login" />
}
