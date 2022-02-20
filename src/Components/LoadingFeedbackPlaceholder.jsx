import React from 'react'

export default function LoadingFeedbackPlaceholder () {
  return (
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
  )
}
