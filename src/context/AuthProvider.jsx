import React, { useState, createContext, useContext } from 'react'
import { getSession, clearSession, getTokenFromSesion } from '../services/session'

export const AuthContext = createContext()

export function useAuth () {
  return useContext(AuthContext)
}

export function AuthContextProvider ({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(() => getSession())
  const [token, setToken] = useState(() => getTokenFromSesion())

  const cleanLoggedInUser = () => {
    setLoggedInUser(null)
    setToken(null)
    clearSession()
  }

  const context = {
    loggedInUser,
    token,
    setToken,
    setLoggedInUser,
    cleanLoggedInUser
  }
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
