import React, { useContext } from 'react'
import Container from './Container'
import { DomManipulationContext } from '../context/DomManipulationContext'
import { FeedbackContext } from '../context/FeedbackContext'
import { Link } from 'react-router-dom'

export default function Roadmap () {
  const { showMenu } = useContext(DomManipulationContext)
  const { feedback, error } = useContext(FeedbackContext)
  const statuses = ['Planned', 'In-Progress', 'Live']

  if (error) return <div>There was an error</div>
  if (!feedback) return <div>Loading...</div>

  return (
    <Container
      className="roadmap"
      style={showMenu ? { display: 'block' } : {}}
    >
      <div className="roadmap-header">
        <h3>Roadmap</h3>
        <Link to="/roadmap">View</Link>
      </div>
      <ul>
        {statuses.map((status) => {
          const stats = feedback.data.reduce((acc, entry) => {
            acc[entry.status] = 1 + acc[entry.status] || 1
            return acc
          }, {})
          return (
            <li key={status}>
              <div>
                <span
                  className={`circle ${status.toLowerCase()} material-icons`}
                >
                  circle
                </span>
                <span>{status}</span>
              </div>
              <span>{stats[status.toLowerCase()] || 0}</span>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
