import React, { useState } from 'react'
import { getTokenFromSesion } from '../services/session'
import useSWR from 'swr'
import GenericError from '../Components/GenericError'
import { config } from '../config'
import Container from './Container'
import Thumbnail from './Thumbnail'
import { Link } from 'react-router-dom'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function UserInfo() {
  const [edit, setEdit] = useState(false)
  const token = getTokenFromSesion()

  const { data: user, error } = useSWR(
    [
      `${config.API_URL}/api/v1/users/profile`,
      { headers: { Authorization: `Bearer ${token}` } },
    ],
    fetcher
  )
//   TODO
  const handleEdit = () => {}
  if (error) return <GenericError>failed to load</GenericError>
  if (!user) return <div>loading...</div>
  const { username, name, lastname, email, thumbnail, submissions, comments } =
    user.data
  return (
    <Container className="user-info">
      <Container className="user-info-details">
        <Thumbnail src={thumbnail} alt={username} />
        <Container>
          <h2>
            Account Details{' '}
            <span className="material-icons" onClick={handleEdit}>
              edit
            </span>
          </h2>
          <ul>
            <li>
              <strong>Username</strong>: {username}
            </li>
            <li>
              <strong>Name</strong>: {name}
            </li>
            <li>
              <strong>Lastname</strong>: {lastname}
            </li>
            <li>
              <strong>Email</strong>: {email}
            </li>
          </ul>
        </Container>
        <div className="user-info-submissions">
          <Container>
            <h3>
              Latest Contributions{' '}
              <span className="material-icons">reviews</span>
            </h3>
            <ul>
              {submissions.length ? submissions.map((s) => {
                return (
                  <li key={s.id}>
                    <Link to={`/feedback/${s.id}`}>- {s.title}</Link>
                  </li>
                )
              }) : 'No submissions yet.'}
            </ul>
          </Container>
          <Container>
            <h3>
              Latest Comments <span className="material-icons">comment</span>
            </h3>
            <ul>
              {comments.length ? comments.map((c) => {
                return (
                  <li key={c.feedback}>
                    <Link to={`/feedback/${c.feedback}`}>
                      {c.content.length > 30
                        ? `- ${c.content.slice(0, 30)}...`
                        : `- ${c.content}`}
                    </Link>
                  </li>
                )
              }): 'No comments yet.'}
            </ul>
          </Container>
        </div>
      </Container>
    </Container>
  )
}
