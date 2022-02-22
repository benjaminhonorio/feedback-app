import React from 'react'

export default function Thumbnail({src, alt}) {
  return (
    <div className="thumbnail-container">
        <img className="thumbnail" src={src} alt={alt} />
        <span className="material-icons add-photo-icon">add_a_photo</span>
    </div>
  )
}
