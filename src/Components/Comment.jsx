import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { capitalize } from '../utils'

export default function Comment ({ user, text, handleDeleteComment, commentId }) {
  const { loggedInUser } = useAuth()
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

        {loggedInUser?.username === user?.username
          ? <span onClick={() => handleDeleteComment(commentId)} className="material-icons delete-comment-btn">delete</span>
          : <a className="reply-btn" href="#" onClick={(e) => e.preventDefault()}>
          Reply
        </a>}

      </div>
      <p className="comment-text">{text}</p>
    </div>
  )
}
