import React, { useContext, useState } from 'react'
import Container from './Container'
import { DomManipulationContext } from '../context/DomManipulationContext'
import { useNavigate } from 'react-router-dom'

export default function AppName () {
  const { showMenu, setShowMenu } = useContext(DomManipulationContext)
  const [userLoggedIn, setUserLoggedIn] = useState(true)
  const navigate = useNavigate()

  const handleLogOut = (e) => {
    e.preventDefault()
    setUserLoggedIn(false)
  }

  const handleLogIn = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <Container className="app-name">
      <div>
        <h1>Make It Real</h1>
        <p>Feedback Board</p>
        <div className="authentication">
          {userLoggedIn
            ? (
            <p>
              Hello User,{' '}
              <a href="" onClick={(e) => handleLogOut(e)}>
                Logout
              </a>
            </p>
              )
            : (
            <p>
              <a href="" onClick={(e) => handleLogIn(e)}>Login</a> or <a href="" onClick={(e) => handleSignUp(e)}>Signup</a>
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
