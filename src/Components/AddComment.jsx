import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'

export default function AddComment ({ socket, comments, feedbackId, setCommentCount }) {
  const [leftCharacters, setLeftCharacters] = useState(250)
  const [content, setContent] = useState('')
  const { loggedInUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (content.length === 0) {
      console.log("don't add empty comment")
    } else {
      await socket.emit('new-comment', { feedbackId, user: loggedInUser, content })
      setContent('')
    }
  }

  useEffect(() => {
    setCommentCount(comments.length)
  }, [comments])

  const handleInputChange = (e) => {
    const text = e.target.value
    setContent(text)
  }
  useEffect(() => {
    setLeftCharacters(250 - content.length)
  }, [content.length])

  return (
    <div className="new-comment container">
      <h3>Add Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          maxLength="250"
          rows="5"
          placeholder="Type your comment here"
          value={content}
          name="content"
          onChange={handleInputChange}
          data-test-id="comment-form"
        ></textarea>
        <div className="new-comment-footer">
          <span>{leftCharacters} Characters left</span>
          <button className="add-feedback">Post Comment</button>
        </div>
      </form>
    </div>
  )
}
