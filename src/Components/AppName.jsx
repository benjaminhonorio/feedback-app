import React, { useContext } from 'react'
import Container from './Container'
import { DomManipulationContext } from '../context/DomManipulationContext'

export default function AppName () {
  const { showMenu, setShowMenu } = useContext(DomManipulationContext)
  return (
    <Container className="app-name">
      <div>
        <h1>Make It Real</h1>
        <p>Feedback Board</p>
      </div>
      {showMenu === true
        ? (<span
          onClick={() => setShowMenu(!showMenu)}
          className="menu material-icons"
        >
          menu_open
        </span>)
        : (<span
          onClick={() => setShowMenu(!showMenu)}
          className="menu material-icons"
        >
          menu
        </span>)
      }
    </Container>
  )
}
