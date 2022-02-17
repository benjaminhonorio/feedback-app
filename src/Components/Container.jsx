import React from 'react'

export default function Container ({ className, style, children }) {
  return (
    <div className={`${className ?? ''} container`} style={style}>{children}</div>
  )
}
