import React from 'react'
import Container from './Container'
import { useDOM } from '../context/DomProvider'
import { useTags } from '../context/TagsProvider'

export default function Tags () {
  const { selectedTag = 'all', setSelectedTag } = useTags()
  const { showMenu } = useDOM()

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
