import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { config } from '../config.jsx'
import BaseFormFeedback from '../Pages/BaseFormFeedback.jsx'

export default function EditFeedback () {
  const [feedback, setFeedback] = useState(null)
  const id = useParams().id
  useEffect(() => {
    const getFeedback = async () => {
      const { data: { data } } = await axios.get(`${config.API_URL}/api/v1/feedback/${id}`)
      setFeedback(data)
    }
    getFeedback()
  }, [])

  const user = {
    admin: true
  }

  return feedback
    ? (
    <BaseFormFeedback
      topFormIcon="edit"
      formTitle={`Editing '${feedback.title}' `}
      formSaveButtonLabel="Save Changes"
      feedback={feedback}
      user={user}
      type="edit"
    />
      )
    : <p>Loading...</p>
}
