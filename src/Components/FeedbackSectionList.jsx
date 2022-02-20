import React from 'react'
import { config } from '../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { capitalize } from '../utils'
import { useFeedback } from '../context/FeedbackProvider'
import { useTags } from '../context/TagsProvider'
import GenericError from './GenericError'
import LoadingFeedbackPlaceholder from './LoadingFeedbackPlaceholder'

export default function FeedbackSectionList () {
  const { feedback, error, filteredFeedback, mutate } = useFeedback()
  const { selectedTag } = useTags()
  const navigate = useNavigate()

  const handleFeedbackClicked = (id) => {
    navigate(`/feedback/${id}`)
  }

  const handleUpvotes = (e, id) => {
    e.stopPropagation()
    mutate(async (response) => {
      const updatedFeedback = await axios.put(`${config.API_URL}/api/v1/feedback/${id}/upvote`)
      const filteredFeedback = response.data.filter(f => f.id !== id)
      return { data: [...filteredFeedback, updatedFeedback.data.data] }
    }, true)
  }

  let feedbackSubmissions = []
  if (selectedTag === 'all') {
    feedbackSubmissions = feedback?.data || []
  } else if (selectedTag !== 'all') {
    feedbackSubmissions = filteredFeedback
  }

  if (error) return <GenericError />
  if (!feedback) {
    return (
      <div className="list-feedback-section">
        <LoadingFeedbackPlaceholder />
        <LoadingFeedbackPlaceholder />
        <LoadingFeedbackPlaceholder />
      </div>
    )
  }
  return (
    <div className="list-feedback-section">
      {feedbackSubmissions?.length
        ? (
            feedbackSubmissions.map((f) => (
          <div className="container single-feedback" key={f.id}>
            <div>
              <button className="upvotes" onClick={(e) => handleUpvotes(e, f.id)}>
                <span className="material-icons">expand_less</span>
                <span>{f.upvotes}</span>
              </button>
            </div>
            <div className="feedback-content">
              <h3 onClick={() => handleFeedbackClicked(f.id)}>{f.title}</h3> <p>{f.description}</p>
              <p>
                <span className="tag">
                  {capitalize(f.tag)}
                </span>
              </p>
            </div>
            <div onClick={() => handleFeedbackClicked(f.id)} className="comments-counter">
              <span className="comments-icon material-icons">
                question_answer
              </span>
              <span className="count">{f.comments?.length || 0}</span>
            </div>
          </div>
            ))
          )
        : (
        <div className="container single-feedback no-feedback">
          <div>No feedback yet.</div>
          <img src="/waiting_feedbacks.png" />
        </div>
          )}
    </div>
  )
}
