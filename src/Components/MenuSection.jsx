import React, { useEffect } from 'react'
import { useDOM } from '../context/DomProvider'
import AppName from './AppName'
import RoadmapSection from './RoadmapSection'
import Tags from './Tags'

const openMenuOnMobile = {
  display: 'flex',
  flexDirection: 'column'
}
export default function MenuSection () {
  const { showMenu, openMenu, setShowMenu } = useDOM()

  useEffect(() => {
    window.addEventListener('resize', openMenu)
    return () => window.removeEventListener('resize', openMenu)
  })

  useEffect(() => {
    return () => setShowMenu(false)
  }, [])

  return (
    <>
      <aside className="menu-section" style={showMenu ? openMenuOnMobile : {}}>
        <AppName />
        <Tags />
        {showMenu && <hr style={{ border: '2px solid #eee' }} />}
        <RoadmapSection />
      </aside>
    </>
  )
}
