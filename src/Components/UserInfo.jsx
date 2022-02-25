import React, { useEffect, useRef, useState } from 'react'
import { getTokenFromSesion } from '../services/session'
import GenericError from '../Components/GenericError'
import { config } from '../config'
import Container from './Container'
import Thumbnail from './Thumbnail'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AccountDetailsForm from './AccountDetailsForm'
import AccountDetails from './AccountDetails'


export default function UserInfo() {
  const token = getTokenFromSesion()
  const [edit, setEdit] = useState(false)
  const [newThumbnail, setNewThumbnail] = useState('')
  const handleEdit = () => {
    setEdit(!edit)
  }

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({
    id:"", username: "", name:"", lastname:"", email: "", thumbnail: "", comments:[], submissions:[]
  })

  useEffect(() => {
    const getProfileInfo = async () => {
      setLoading(true)
      try {
        const {data: user} = await axios.get(`${config.API_URL}/api/v1/users/profile`,
      { headers: { Authorization: `Bearer ${token}` }})
      const { id, username, name, lastname, email, thumbnail, comments, submissions } = user.data 
      setLoading(false)
      setProfile({...profile, id, username, name, lastname, email, thumbnail,  comments, submissions})
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }
    
    getProfileInfo()
  }, [edit])

  const handlePhotoChange = ({ target }) => {
    const formData = new FormData()
    let file = target.files[0]
    formData.append('file', file)
    formData.append('upload_preset', config.CLOUDINARY_UPLOAD_PRESET)
    axios.post(config.CLOUDINARY_UPLOAD_URL, formData).then((response) => {
      setNewThumbnail(response.data.url)
    })
  }

  const photoRef = useRef()

  if (error) return <GenericError>failed to load</GenericError>
  if (loading) return <div>loading...</div>

  return (
    <div className="user-info">
      <Container className="user-info-details">
        <Thumbnail
          src={newThumbnail.length ? newThumbnail : profile.thumbnail}
          alt={profile.username}
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
              user={profile}
              edit={edit}
              setEdit={setEdit}
              thumbnail={newThumbnail.length ? newThumbnail : profile.thumbnail}
            />
          ) : (
            <AccountDetails user={profile} />
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
            {profile.submissions.length
              ? profile.submissions.map((s) => {
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
            {profile.comments.length
              ? profile.comments.map((c) => {
                  return (
                    <li key={c.id}>
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
