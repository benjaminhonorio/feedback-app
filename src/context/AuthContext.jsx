import React, { useState, createContext } from 'react'
import { getSession, clearSession } from '../services/session'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => getSession())

  const cleanLoggedInUser = () => {
    setLoggedInUser(null)
    clearSession()
  }

  const context = {
    loggedInUser,
    setLoggedInUser,
    cleanLoggedInUser
  }
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
