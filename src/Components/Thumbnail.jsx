import React from 'react'
import {config} from '../config'

export default function Thumbnail({src, alt, edit, uploadRef}) {

  const handleClick = () => {
    uploadRef.current.click()
  }

  return (
    <div className="thumbnail-container">
        <img className="thumbnail" src={src} alt={alt} />
        {edit && <span onClick={handleClick} className="material-icons add-photo-icon">add_a_photo</span>}
    </div>
  )
}
