import React from 'react'
import Comment from './Comment'

export default function CommentList ({ comments, socket }) {
  return comments.map((comment, i) => {
    const user = {
      username: comment.user.username,
      name: comment.user.name,
      lastname: comment.user.lastname,
      thumbnail: comment.user.thumbnail
    }
    const commentId = comment.id || 0

    const handleDeleteComment = () => {
      socket.emit('delete-comment', { commentId })
    }

    return (
      <div key={comment.id}>
        <Comment socket={socket} user={user} text={comment.content} commentId={commentId} handleDeleteComment={handleDeleteComment}/>
        {comments.length - 1 !== i && <hr />}
      </div>
    )
  })
}
