import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Container from '../Components/Container'
import { FeedbackContext } from '../context/FeedbackContext'
import useAuth from '../hooks/useAuth'
import { deleteFeedback, getFeedback } from '../services/feedback'
import { getToken } from '../services/session'
import { capitalize } from '../utils'

function Comment ({ user, text }) {
  return (
      <div className="comment-wrapper">
        <div className="comment-header">
          <div className="comment-user">
            <div className="user-image">
              <img src={user.thumbnail} />
            </div>
            <div className="comment-username">
              <h3>{capitalize(`${user.name} ${user.lastname}`)}</h3>
              <p>@{user.username}</p>
            </div>
          </div>
          <a className="reply-btn" href="#">
            Reply
          </a>
        </div>
        <p className="comment-text">{text}</p>
      </div>
  )
}

export default function FeedbackDetail () {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const [leftCharacters, setLeftCharacters] = useState(250)
  const [error, setError] = useState(false)
  const [feedbackPost, setFeedbackPost] = useState(null)
  const { loggedInUser } = useAuth()
  const { mutate } = useContext(FeedbackContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const token = getToken()

  useEffect(() => {
    const setFeedback = async () => {
      try {
        const { data, user } = await getFeedback(id, token)
        setFeedbackPost(data)
        setIsAdmin(user.admin)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    setFeedback()
  }, [])

  const handleUpvotes = () => () => {}

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      await deleteFeedback(id, token)
      await mutate(false)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (commentText.length === 0) {
      console.log("don't add empty comment")
    } else {
      const { name, lastname, username, thumbnail } = loggedInUser
      const newComment = { name, lastname, username, thumbnail, commentText }
      setComments(comments.concat(newComment))
      setCommentText('')
    }
  }

  const handleInputChange = (e) => {
    const text = e.target.value
    setCommentText(text)
  }

  useEffect(() => {
    setLeftCharacters(250 - commentText.length)
  }, [commentText.length])

  return (
    <div className="page-wrapper">
      <div className="page-links">
        <Link to="/">{'<'} Go back</Link>
        {loggedInUser &&
          (loggedInUser?.username === feedbackPost?.user.username ||
            isAdmin) && (
            <div>
              <a className="delete-feedback" href="" onClick={handleDelete}>
                <span className="material-icons">delete</span>
              </a>
              <Link className="edit-feedback" to={`/feedback/${id}/edit`}>
                Edit Feedback
              </Link>
            </div>
        )}
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
            {comments.length
              ? (
                  comments.map((comment, i) => {
                    const user = {
                      username: comment.username,
                      name: comment.name,
                      lastname: comment.lastname,
                      thumbnail: comment.thumbnail
                    }
                    return (
                  <div key={i} >
                    <Comment user={user} text={comment.commentText} />
                    {comments.length - 1 !== i && <hr /> }
                  </div>
                    )
                  })
                )
              : (
              <div>No comments yet. Be the first one!</div>
                )}
          </div>
          {loggedInUser
            ? (
            <div className="new-comment container">
              <h3>Add Comment</h3>
              <form onSubmit={handleSubmit}>
                <textarea
                  maxLength="250"
                  rows="5"
                  placeholder="Type your comment here"
                  value={commentText}
                  onChange={handleInputChange}
                ></textarea>
                <div className="new-comment-footer">
                  <span>{leftCharacters} Characters left</span>
                  <button className="add-feedback">Post Comment</button>
                </div>
              </form>
            </div>
              )
            : (
            <Container>
              <p>
                Please{' '}
                <Link
                  style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                  to="/login"
                >
                  login
                </Link>{' '}
                to be part of the conversation
              </p>
            </Container>
              )}
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
