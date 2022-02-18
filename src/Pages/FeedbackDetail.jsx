import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from '../Components/Container'
import { config } from '../config'
import useAuth from '../hooks/useAuth'

export default function FeedbackDetail () {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [feedbackPost, setFeedbackPost] = useState(null)
  const { loggedInUser } = useAuth()
  const { id } = useParams()
  useEffect(() => {
    const getFeedback = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/api/v1/feedback/${id}`
        )
        setFeedbackPost(response.data.data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    getFeedback()
  }, [])

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)
  const handleUpvotes = () => () => {}

  return (
    <div className="page-wrapper">
      <div className="page-links">
        <Link to="/">{'<'} Go back</Link>
        <Link className="edit-feedback" to={`/feedback/${id}/edit`}>
          Edit Feedback
        </Link>
      </div>
      {!loading && feedbackPost
        ? (
        <div className="comments-view">
          <div className="container single-feedback " key={feedbackPost.id}>
            <div>
              <button
                className="upvotes"
                onClick={(e) => handleUpvotes(e, feedbackPost.id)}
              >
                <span className="material-icons">expand_less</span>
                <span>{feedbackPost.upvotes}</span>
              </button>
            </div>
            <div className="feedback-content">
              <h3>{feedbackPost.title}</h3> <p>{feedbackPost.description}</p>
              <p>
                <span className="tag">{capitalize(feedbackPost.tag)}</span>
              </p>
            </div>
            <div className="comments-counter">
              <span className="comments-icon material-icons">
                question_answer
              </span>
              <span className="count">
                {feedbackPost.comments?.length || 0}
              </span>
            </div>
          </div>
          <div className="comment-section container">
            <h3>{feedbackPost.comments?.length || 0} Comments</h3>
            <div>No comments yet. Be the first one!</div>
          </div>
          {loggedInUser
            ? (<div className="new-comment container">
            <h3>Add Comment</h3>
            <textarea rows="5" placeholder="Type your comment here"></textarea>
            <div className="new-comment-footer">
              <span>250 Characters left</span>
              <a href="#" className="add-feedback">Post Comment</a>
            </div>
          </div>)
            : <Container><p>Please <Link style={{ textDecoration: 'underline', fontWeight: 'bold' }} to="/login">login</Link> to be part of the conversation</p></Container> }

        </div>
          )
        : error
          ? (
        <div>Something went wrong</div>
            )
          : (
        <div className="container single-feedback">
          <div>
            <button className="upvotes">
              <span
                style={{
                  width: '15px',
                  height: '1rem',
                  borderRadius: '.5em'
                }}
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
                style={{
                  width: '30px',
                  height: '1rem',
                  borderRadius: '.5em'
                }}
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
            )}
    </div>
  )
}
