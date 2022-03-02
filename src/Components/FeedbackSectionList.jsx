import React from 'react'
import { config } from '../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { capitalize } from '../utils'
import { useFeedback } from '../context/FeedbackProvider'
import { useTags } from '../context/TagsProvider'
import GenericError from './GenericError'
import LoadingFeedbackPlaceholder from './LoadingFeedbackPlaceholder'

export default function FeedbackSectionList() {
  const { feedback, error, filteredFeedback, mutate, setFilteredFeedback } =
    useFeedback()
  const { selectedTag } = useTags()
  const navigate = useNavigate()
  const handleFeedbackClicked = (id) => {
    navigate(`/feedback/${id}`)
  }

  const handleUpvotes = async (e, id) => {
    e.stopPropagation()
    const target = feedback.data.find((f) => f.id === id)
    target.upvotes += 1
    setFilteredFeedback([...feedback.data, target])
    // mutate(
    //   `${config.API_URL}/api/v1/feedback/${id}/upvote`,
    //   { data: [...feedback.data, target] },
    //   false
    // )
    await axios.put(`${config.API_URL}/api/v1/feedback/${id}/upvote`)
    // mutate(`${config.API_URL}/api/v1/feedback/${id}/upvote`)
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
                  { `${f.tag.length > 2 ? capitalize(f.tag) : f.tag.toUpperCase() }` }
                </span>
              </p>
            </div>
            <div onClick={() => handleFeedbackClicked(f.id)} className="comments-counter">
              <span className="comments-icon material-icons">
                question_answer
              </span>
              <span className="count">{f.commentsCount || 0}</span>
            </div>
          </div>
            ))
          )
        : (
        <div className="container single-feedback no-feedback">
          <img src="/waiting_feedbacks.png" />
        </div>
          )}
    </div>
  )
}
