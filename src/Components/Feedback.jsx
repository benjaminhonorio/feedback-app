import React, { useEffect, useState } from 'react'
import { useFeedback } from '../context/FeedbackProvider'
import { capitalize } from '../utils'

export default function Feedback ({ feedback, socket, commentCount }) {
  const [upvotes, setUpvotes] = useState(feedback.upvotes)
  const { mutate } = useFeedback()
  const handleUpvotes = () => {
    socket.emit('upvote', { feedbackId: feedback.id })
    mutate(true)
  }
  useEffect(() => {
    if (socket) {
      socket.on('update-feedback-upvotes', data => {
        setUpvotes(data)
      })
    }
  }, [])

  return (
    <div className="container single-feedback " key={feedback.id}>
    <div>
      <button
        className="upvotes"
        onClick={handleUpvotes}
      >
        <span className="material-icons">expand_less</span>
        <span>{upvotes}</span>
      </button>
    </div>
    <div className="feedback-content">
      <h3>{feedback.title}</h3> <p>{feedback.description}</p>
      <p>
        <span className="tag">{capitalize(feedback.tag)}</span>
      </p>
    </div>
    <div className="comments-counter">
      <span className="comments-icon material-icons">
        question_answer
      </span>
      <span className="count">
        {commentCount}
      </span>
    </div>
  </div>
  )
}
