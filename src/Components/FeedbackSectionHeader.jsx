import React, { useState } from 'react'
import { useFeedback } from '../context/FeedbackProvider'
import { Link } from 'react-router-dom'
import { useDOM } from '../context/DomProvider'

export default function FeedbackSectionHeader () {
  const [sortBySelected, setSortBySelected] = useState('Most Recent')
  const { feedback, setSortOptions } = useFeedback()
  const { showDropDownMenu, setShowDropDownMenu } = useDOM()

  const handleSortBySelection = (e) => {
    e.preventDefault()
    setSortBySelected(e.target.innerHTML)
    const sortQuery = e.target.dataset.val ? `sortBy=${e.target.dataset.val}` : ''
    setSortOptions(sortQuery)
    setShowDropDownMenu(!showDropDownMenu)
  }

  const openDropDown = (e) => {
    e.preventDefault()
    setShowDropDownMenu(!showDropDownMenu)
  }

  return (
    <div className="container header-feedback-section">
    <h3>
      <span className="material-icons">emoji_objects</span>
      {!feedback?.data ? 0 : feedback.data.length }&nbsp;Suggestions
    </h3>
    <div className="sortby">
      <span>Sort by: &nbsp;</span>
      <a onClick={openDropDown} className="dropdown" href="">
        {sortBySelected} <span className="material-icons">expand_more</span>
      </a>
      <ul className="dropdown-list" style={showDropDownMenu ? { display: 'flex' } : { display: 'none' }}>
        <li data-val="upvotes" onClick={handleSortBySelection}>Most Upvotes</li>
        <li data-val="" onClick={handleSortBySelection}>Most Recent</li>
        <li data-val="commentsCount" onClick={handleSortBySelection}>Most Comments</li>
      </ul>
    </div>
    <Link to="/feedback/new" className="add-feedback">+&nbsp;Add&nbsp;Feedback</Link>
  </div>
  )
}
