import React, { useEffect, useContext } from 'react'
import { DomManipulationContext } from '../context/DomManipulationContext'
import AppName from './AppName'
import Roadmap from './Roadmap'
import Tags from './Tags'

export default function MenuSection () {
  const { showMenu, openMenu } = useContext(DomManipulationContext)

  const openMenuOnMobile = {
    display: 'flex',
    flexDirection: 'column'
  }

  useEffect(() => {
    window.addEventListener('resize', openMenu)
    return () => window.removeEventListener('resize', openMenu)
  })

  return (
    <aside className="menu-section" style={showMenu ? openMenuOnMobile : {}}>
      <AppName />
      <Tags />
      {showMenu && <hr style={{ border: '2px solid #eee' }} />}
      <Roadmap />
    </aside>
  )
}
