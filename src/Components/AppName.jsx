import React, { useContext } from 'react'
import Container from './Container'
import { DomManipulationContext } from '../context/DomManipulationContext'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function AppName () {
  const { showMenu, setShowMenu } = useContext(DomManipulationContext)
  const { loggedInUser, cleanLoggedInUser } = useAuth()

  const handleLogOut = () => {
    cleanLoggedInUser()
  }

  return (
    <Container className="app-name">
      <div>
        <h1>Make It Real</h1>
        <p>Feedback Board</p>
        <div className="authentication">
          {loggedInUser
            ? (
            <p>
              Hi {loggedInUser.name}.
              <Link to="/" onClick={handleLogOut}> Logout </Link>
            </p>
              )
            : (
            <p>
              <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
            </p>
              )}
        </div>
      </div>
      {showMenu === true
        ? (
        <span
          onClick={() => setShowMenu(!showMenu)}
          className="menu-icon material-icons"
        >
          menu_open
        </span>
          )
        : (
        <span
          onClick={() => setShowMenu(!showMenu)}
          className="menu-icon material-icons"
        >
          menu
        </span>
          )}
    </Container>
  )
}
