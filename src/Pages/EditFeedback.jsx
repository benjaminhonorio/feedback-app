import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { config } from '../config.jsx'

import BaseFormFeedback from '../Pages/BaseFormFeedback.jsx'
import { getToken } from '../services/session.jsx'

export default function EditFeedback () {
  const [isAdmin, setIsAdmin] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const id = useParams().id
  const token = getToken()
  useEffect(() => {
    const getFeedback = async () => {
      const { data: { data, user } } = await axios.get(`${config.API_URL}/api/v1/feedback/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // I'm checking if the user currently loggedin is admin, so it can see the
      // aditional edit field for the status, else it won't be able to see it
      setIsAdmin(user)
      setFeedback(data)
    }
    getFeedback()
  }, [])
  return feedback
    ? (
    <BaseFormFeedback
      topFormIcon="edit"
      formTitle={`Editing '${feedback.title}' `}
      formSaveButtonLabel="Save Changes"
      feedback={feedback}
      user={isAdmin}
      type="edit"
    />
      )
    : (<BaseFormFeedback
      topFormIcon="edit"
      formTitle="Editing ..."
      formSaveButtonLabel="Save Changes"
      feedback={{ title: 'loading ...', category: '', status: '', description: 'loading...' }}
      user={isAdmin}
      type="edit"
    />)
}
