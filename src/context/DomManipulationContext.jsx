import React, { createContext, useState } from 'react'

export const DomManipulationContext = createContext()

export function DomManipulationContextProvider ({ children }) {
  const [showMenuOnMobile, setShowMenuOnMobile] = useState(false)
  const [showDropDownMenu, setShowDropDownMenu] = useState(false)
  const openMenu = () => {
    setShowMenuOnMobile(false)
  }
  const openDropDown = () => {
    setShowDropDownMenu(false)
  }

  return (
    <DomManipulationContext.Provider value={{ showMenu: showMenuOnMobile, setShowMenu: setShowMenuOnMobile, openMenu, openDropDown, setShowDropDownMenu, showDropDownMenu }}>
      {children}
    </DomManipulationContext.Provider>
  )
}
