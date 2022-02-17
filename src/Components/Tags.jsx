import React, { useContext } from 'react'
import Container from './Container'
import { DomManipulationContext } from '../context/DomManipulationContext'
import { FeedbackContext } from '../context/FeedbackContext'

// import axios from 'axios'

export default function Tags () {
  const { selectedTag, setSelectedTag } = useContext(FeedbackContext)
  const { showMenu } = useContext(DomManipulationContext)

  const resetStyle = { display: 'flex', maxWidth: 'initial' }

  const handleTagChange = (tag, e) => {
    e.preventDefault()
    setSelectedTag(tag.toLowerCase())
  }
  const tags = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature']
  return (
    <Container className="tags" style={showMenu ? resetStyle : {}}>
        {tags.map(tag => {
          return <a onClick={(e) => handleTagChange(tag, e)} href="#" key={tag} className={`tag ${selectedTag === tag.toLowerCase() ? 'active' : ''}`}>
            {tag}</a>
        })}
    </Container>
  )
}
