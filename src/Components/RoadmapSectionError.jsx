import React from 'react'
import { Link } from 'react-router-dom'
import { useDOM } from '../context/DomProvider'
import Container from './Container'

export default function RoadmapSectionError () {
  const { showMenu } = useDOM()
  return (
    <Container className="roadmap" style={showMenu ? { display: 'block' } : {}}>
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
              <span>0</span>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
