import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { deleteFeedback } from '../services/feedback'
import AddComment from '../Components/AddComment'
import CommentList from '../Components/CommentList'
import Feedback from '../Components/Feedback'
import LoginToLeaveComments from '../Components/LoginToLeaveComments'
import LoadingFeedbackPlaceholder from '../Components/LoadingFeedbackPlaceholder'
import GenericError from '../Components/GenericError'
import { useFeedback } from '../context/FeedbackProvider'
import { config } from '../config'
import io from 'socket.io-client'

export default function FeedbackDetail () {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [comments, setComments] = useState([])
  const [commentCount, setCommentCount] = useState(0)
  const [error, setError] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [socket, setSocket] = useState(null)
  const { loggedInUser, token } = useAuth()
  const { mutate } = useFeedback()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      const socket = io(config.API_URL, { auth: { token } })
      setSocket(socket)
    } else {
      const socket = io(config.API_URL)
      setSocket(socket)
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        // console.log('socket connected')
      })
      socket.on('disconnect', () => {
        setSocket(null)
        // console.log('socket disconnected')
        setError(true)
        setLoading(false)
      })

      socket.on('receive-feedback', ({ feedback, user }) => {
        setComments(feedback.comments)
        setCommentCount(feedback.comments.length)
        setFeedback(feedback)
        setIsAdmin(user)
        setLoading(false)
      })

      socket.on('update-comments', ({ comments }) => {
        setComments(comments)
      })

      socket.on('receive-comment', ({ comments }) => {
        setComments(comments)
      })

      socket.on('connect_error', () => {
        setError(true)
        setLoading(false)
      })

      socket.emit('join-feedback-room', { feedbackId: id })

      return () => {
        socket.emit('leave-feedback-room', { feedbackId: id })
        socket.disconnect()
      }
    }
  }, [socket])

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

  return (
    <div className="page-wrapper">
      <div className="page-links">
        <Link to="/">{'<'} Go back</Link>
        {loggedInUser &&
          (loggedInUser?.username === feedback?.user.username || isAdmin) && (
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
      {loading && <LoadingFeedbackPlaceholder />}
      {error && <GenericError />}
      {!loading && feedback && (
        <div className="comments-view">
          <Feedback feedback={feedback} socket={socket} commentCount={commentCount} />
          {!loggedInUser
            ? (
            <LoginToLeaveComments />
              )
            : (
            <>
              <div className="comment-section container">
                <h3>
                  {commentCount || 0}{' '}
                  {commentCount > 1 ? 'Comments' : 'Comment'}
                </h3>
                {comments.length
                  ? (
                  <CommentList
                    socket={socket}
                    comments={comments}
                    setComments={setComments}
                  />
                    )
                  : (
                  <div>No comments yet. Be the first one!</div>
                    )}
              </div>
              <AddComment
                socket={socket}
                feedbackId={id}
                comments={comments}
                setComments={setComments}
                setCommentCount={setCommentCount}
              />
            </>
              )}
        </div>
      )}
    </div>
  )
}
