import React, { useRef, useState } from 'react'
import { getTokenFromSesion } from '../services/session'
import useSWR from 'swr'
import GenericError from '../Components/GenericError'
import { config } from '../config'
import Container from './Container'
import Thumbnail from './Thumbnail'
import { Link } from 'react-router-dom'
import axios from 'axios'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function AccountDetails({ user }) {
  const { username, name, lastname, email } = user
  return (
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
  )
}

function AccountDetailsForm({ user, thumbnail, edit, setEdit }) {
  const token = getTokenFromSesion()

  const [values, setValues] = useState(() => {
    const { username, name, lastname, email } = user
    return { username, name, lastname, email }
  })

  const handleInputChange = ({ target }) => {
    setValues((values) => ({ ...values, [target.name]: target.value }))
  }
  const handleSubmit = () => {
    const { username, name, lastname, email } = values
    const newUserData = { username, name, lastname, email, thumbnail }
    axios.put(`${config.API_URL}/api/v1/users/${user.id}`, newUserData, {
      headers: { Authorization: `Bearer ${token}` },
    }).catch((error) => {console.error(error)})
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setEdit(!edit)

  }

  return (
    <form
      onSubmit={handleSubmit}
      id="account-form"
      className="account-details-form"
    >
      <label>
        <strong>Username:</strong>
        <input
          onChange={handleInputChange}
          type="text"
          name="username"
          value={values.username}
        />
      </label>
      <label>
        <strong>Name:</strong>
        <input
          onChange={handleInputChange}
          type="text"
          name="name"
          value={values.name}
        />
      </label>
      <label>
        <strong>Lastname:</strong>
        <input
          onChange={handleInputChange}
          type="text"
          name="lastname"
          value={values.lastname}
        />
      </label>
      <label>
        <strong>Email:</strong>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          value={values.email}
        />
      </label>
      <button onClick={handleCancel} className="cancel account-details-btn">Cancel</button>
      <button type="submit" className="account-details-btn">Save&nbsp;Changes</button>
    </form>
  )
}

export default function UserInfo() {
  const token = getTokenFromSesion()
  const [edit, setEdit] = useState(false)
  const [newThumbnail, setNewThumbnail] = useState('')
  const handleEdit = () => {
    setEdit(!edit)
  }
  const { data: user, error } = useSWR(
    [
      `${config.API_URL}/api/v1/users/profile`,
      { headers: { Authorization: `Bearer ${token}` } },
    ],
    fetcher
  )
  const handlePhotoChange = ({ target }) => {
    const formData = new FormData()
    let file = target.files[0]
    formData.append('file', file)
    formData.append('upload_preset', config.CLOUDINARY_UPLOAD_PRESET)
    axios.post(config.CLOUDINARY_UPLOAD_URL, formData).then((response) => {
      setNewThumbnail(response.data.url)
    })
  }

  //   TODO
  const photoRef = useRef()

  if (error) return <GenericError>failed to load</GenericError>
  if (!user) return <div>loading...</div>

  const { username, thumbnail, submissions, comments } = user.data
  return (
    <div className="user-info">
      <Container className="user-info-details">
        <Thumbnail
          src={newThumbnail.length ? newThumbnail : thumbnail}
          alt={username}
          edit={edit}
          uploadRef={photoRef}
        />
        <input
          style={{ display: 'none' }}
          ref={photoRef}
          onChange={handlePhotoChange}
          type="file"
          form="account-details-form"
        />
        <div>
          <h2>Account Details </h2>
          {edit ? (
            <AccountDetailsForm
              user={user.data}
              edit={edit}
              setEdit={setEdit}
              thumbnail={newThumbnail.length ? newThumbnail : thumbnail}
            />
          ) : (
            <AccountDetails user={user.data} />
          )}
          {!edit && (
            <button onClick={handleEdit} className="account-details-btn edit">
              Edit&nbsp;Profile
            </button>
          )}
        </div>
      </Container>
      <div className="user-info-submissions">
        <Container>
          <h2>
            Latest Feedback <span className="material-icons">reviews</span>
          </h2>
          <ul>
            {submissions.length
              ? submissions.map((s) => {
                  return (
                    <li key={s.id}>
                      <Link to={`/feedback/${s.id}`}>- {s.title}</Link> (
                      {s.upvotes} upvotes)
                    </li>
                  )
                })
              : 'No submissions yet.'}
          </ul>
        </Container>
        <Container>
          <h2>
            Latest Comments <span className="material-icons">comment</span>
          </h2>
          <ul>
            {comments.length
              ? comments.map((c) => {
                  return (
                    <li key={c.feedback}>
                      <Link to={`/feedback/${c.feedback}`}>- {c.content}</Link>
                    </li>
                  )
                })
              : 'No comments yet.'}
          </ul>
        </Container>
      </div>
    </div>
  )
}
