import React, { useContext } from 'react'
import { FeedbackContext } from '../context/FeedbackContext'
import { config } from '../config'
import axios from 'axios'
import { useSWRConfig } from 'swr'
import { useNavigate } from 'react-router-dom'

export default function FeedbackSectionList () {
  const { feedback, error, selectedTag, filteredFeedback, sortOptions } = useContext(FeedbackContext)
  const { mutate } = useSWRConfig()
  const navigate = useNavigate()

  const handleFeedbackClicked = (id) => {
    navigate(`/feedback/${id}`)
  }

  const handleUpvotes = (e, id) => {
    // Prevent click event to trigger the "go to detail feedback page"
    e.stopPropagation()
    // axios.put(`${config.API_URL}/api/v1/feedback/${id}/upvote`)
    mutate(`${config.API_URL}/api/v1/feedback${sortOptions ? `?${sortOptions}` : ''}`, async (response) => {
      const updatedFeedback = await axios.put(`${config.API_URL}/api/v1/feedback/${id}/upvote`)
      const filteredFeedback = response.data.filter(f => f.id !== id)
      return { data: [...filteredFeedback, updatedFeedback.data.data] }
    }, true)
  }
  // TODO: custom pages
  if (error) {
    return (
      <div className="list-feedback-section">
        <div className="container single-feedback">
          Ops...something went wrong!
        </div>
      </div>
    )
  }
  if (!feedback) {
    return (
      <>
      <div className="list-feedback-section">
        <div className="container single-feedback">
          <div>
            <button className="upvotes">
              <span
                style={{ width: '15px', height: '1rem', borderRadius: '.5em' }}
              ></span>
            </button>
          </div>
          <div className="feedback-content">
            <h3
              style={{
                backgroundColor: '#eee',
                width: '200px',
                height: '1rem',
                borderRadius: '.5em'
              }}
            ></h3>{' '}
            <p
              style={{
                backgroundColor: '#eee',
                width: '250px',
                height: '1rem',
                borderRadius: '.5em'
              }}
            ></p>
            <p>
              <a
                style={{ width: '30px', height: '1rem', borderRadius: '.5em' }}
                href="#"
                className="tag"
              ></a>
            </p>
          </div>
          <div className="comments-counter">
            <span
              style={{
                backgroundColor: '#eee',
                width: '30px',
                height: '1rem',
                borderRadius: '.5em'
              }}
              className="count"
            ></span>
          </div>
        </div>
      </div>
      <div className="list-feedback-section">
        <div className="container single-feedback">
          <div>
            <button className="upvotes">
              <span
                style={{ width: '15px', height: '1rem', borderRadius: '.5em' }}
              ></span>
            </button>
          </div>
          <div className="feedback-content">
            <h3
              style={{
                backgroundColor: '#eee',
                width: '200px',
                height: '1rem',
                borderRadius: '.5em'
              }}
            ></h3>{' '}
            <p
              style={{
                backgroundColor: '#eee',
                width: '250px',
                height: '1rem',
                borderRadius: '.5em'
              }}
            ></p>
            <p>
              <a
                style={{ width: '30px', height: '1rem', borderRadius: '.5em' }}
                href="#"
                className="tag"
              ></a>
            </p>
          </div>
          <div className="comments-counter">
            <span
              style={{
                backgroundColor: '#eee',
                width: '30px',
                height: '1rem',
                borderRadius: '.5em'
              }}
              className="count"
            ></span>
          </div>
        </div>
      </div>
      <div className="list-feedback-section">
        <div className="container single-feedback">
          <div>
            <button className="upvotes">
              <span
                style={{ width: '15px', height: '1rem', borderRadius: '.5em' }}
              ></span>
            </button>
          </div>
          <div className="feedback-content">
            <h3
              style={{
                backgroundColor: '#eee',
                width: '200px',
                height: '1rem',
                borderRadius: '.5em'
              }}
            ></h3>{' '}
            <p
              style={{
                backgroundColor: '#eee',
                width: '250px',
                height: '1rem',
                borderRadius: '.5em'
              }}
            ></p>
            <p>
              <a
                style={{ width: '30px', height: '1rem', borderRadius: '.5em' }}
                href="#"
                className="tag"
              ></a>
            </p>
          </div>
          <div className="comments-counter">
            <span
              style={{
                backgroundColor: '#eee',
                width: '30px',
                height: '1rem',
                borderRadius: '.5em'
              }}
              className="count"
            ></span>
          </div>
        </div>
      </div>
      </>
    )
  }

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

  let feedbackSubmissions = []
  if (selectedTag === 'all') {
    feedbackSubmissions = feedback.data
  } else if (selectedTag !== 'all') {
    feedbackSubmissions = filteredFeedback
  }

  return (
    <div className="list-feedback-section">
      {feedbackSubmissions.length
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
        <div className="container single-feedback">
          <div>No feedback yet.</div>
        </div>
          )}
    </div>
  )
}
