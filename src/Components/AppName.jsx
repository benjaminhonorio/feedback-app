import React from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'
import { useAuth } from '../context/AuthProvider'
import { useDOM } from '../context/DomProvider'
import { capitalize } from '../utils'

export default function AppName () {
  const { showMenu, setShowMenu } = useDOM()
  const { loggedInUser, cleanLoggedInUser, setToken } = useAuth()

  const handleLogOut = () => {
    cleanLoggedInUser()
    setToken('')
  }

  const handleDisplayMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <Container className="app-name">
      <div>
        <h1>Make It Real</h1>
        <p>Feedback Board</p>
        <div className="authentication">
          {loggedInUser
            ? <p>Hi <Link to="/profile">{capitalize(loggedInUser.name)}</Link>. <Link to="/" onClick={handleLogOut}> Logout</Link></p>
            : <p><Link to="/login">Login</Link> or <Link to="/signup">Signup</Link></p>
          }
        </div>
      </div>
      {showMenu === true
        ? <span onClick={handleDisplayMenu} className="menu-icon material-icons" > menu_open </span>
        : <span onClick={handleDisplayMenu} className="menu-icon material-icons" > menu </span>
      }
    </Container>
  )
}
