import React from 'react'
import { Link } from 'react-router-dom'

export default function Roadmap () {
  return (
    <div className="container">
    <h3>Roadmap</h3>
    <Link to="/feedback/new" className="add-feedback">+&nbsp;Add&nbsp;Feedback</Link>
  </div>
  )
}
