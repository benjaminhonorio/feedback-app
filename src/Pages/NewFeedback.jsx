import React from 'react'
import BaseFormFeedback from '../Pages/BaseFormFeedback.jsx'

export default function NewFeedback () {
  return (
    <BaseFormFeedback
      topFormIcon="add_circle"
      formTitle="Create New Feedback"
      formSaveButtonLabel="Add New Feedback"
      type="create"
    />
  )
}
