import React from 'react'
import Container from './Container'
import { useFeedback } from '../context/FeedbackProvider'
import { Link } from 'react-router-dom'
import { useDOM } from '../context/DomProvider'
import RoadmapSectionError from './RoadmapSectionError'

export default function RoadmapSection () {
  const { showMenu } = useDOM()
  const { feedback, error } = useFeedback()
  const statuses = ['Planned', 'In-Progress', 'Live']

  if (error) return <RoadmapSectionError />
  if (!feedback) {
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
        {['Planned', 'In-Progress', 'Live'].map((status) => {
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
              <span>loading...</span>
            </li>
          )
        })}
      </ul>
    </Container>
    )
  }
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
        {feedback?.data && statuses.map((status) => {
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
