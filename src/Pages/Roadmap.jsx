import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../Components/Container'
import Main from '../Components/Main'
import { capitalize } from '../utils'
import { useFeedback } from '../context/FeedbackProvider'
import NoFeedbackYet from '../Components/NoFeedbackYet'
import PageNotFound from '../Pages/PageNotFound'

export default function Roadmap () {
  const [selected, setSelected] = useState('planned')
  const [isMobile, setIsMobile] = useState(null)
  const { feedback, error } = useFeedback()
  const navigate = useNavigate()

  const underlineStyle = isMobile ? { borderBottom: '4px solid #9c08b9', color: '#424242' } : {}

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 576)
  }

  const handleFeedbackClicked = (id) => {
    navigate(`/feedback/${id}`)
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 576)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  const handleSelection = (status) => {
    if (isMobile) {
      setSelected(status)
    }
  }
  if (error) return <PageNotFound />
  if (!feedback?.data) return <div>Loading ...</div>
  return (
    <Main style={{ flexDirection: 'column' }}>
      <Container className="roadmap-page-header">
        <div>
          <a href="#" onClick={() => navigate('/')}>{'<'} Go back</a>
          <h3>Roadmap</h3>
        </div>
        <Link to="/feedback/new" className="add-feedback">
          +&nbsp;Add&nbsp;Feedback
        </Link>
      </Container>
      <div className="roadmap-statuses" style={isMobile ? { fontSize: '.85rem' } : {}}>
        <div
          onClick={() => handleSelection('planned')}
          style={selected === 'planned' ? underlineStyle : {}}
        >
          Planned (
          {`${
            feedback?.data.length
              ? feedback.data.filter((f) => f.status === 'planned').length
              : 0
          }`}
          ){' '}
          <div className="status-subtitle">Ideas prioritized for research</div>
        </div>
        <div
          onClick={() => handleSelection('in-progress')}
          style={selected === 'in-progress' ? underlineStyle : {}}
        >
          In-Progress ({`${
            feedback?.data.length
              ? feedback.data.filter((f) => f.status === 'in-progress').length
              : 0
          }`}){' '}
          <div className="status-subtitle">Currently been developed</div>
        </div>
        <div
          onClick={() => handleSelection('live')}
          style={selected === 'live' ? underlineStyle : {}}
        >
          Live ({`${
            feedback?.data.length
              ? feedback.data.filter((f) => f.status === 'live').length
              : 0
          }`}) <div className="status-subtitle">Released features</div>
        </div>
      </div>
      <div className="roadmap-feedback" style={isMobile ? { display: 'flex', margin: ' 1em' } : { display: 'grid' }}>
        <div style={selected !== 'planned' && isMobile ? { display: 'none' } : { display: 'block' }}>
          {feedback?.data.length
            ? (
                feedback.data
                  .filter((f) => f.status === 'planned')
                  .map((f) => (
                <div className="container single-feedback" style={{ borderTop: '5px solid #c7592b' }} key={f.id}>
                  <div>
                    <button className="upvotes">
                      <span className="material-icons">expand_less</span>
                      <span>{f.upvotes}</span>
                    </button>
                  </div>
                  <div className="status">
                    <span className="circle planned material-icons">circle</span><span>Planned</span>
                  </div>
                  <div className="feedback-content">
                    <h3 onClick={() => handleFeedbackClicked(f.id)}>{f.title}</h3> <p>{f.description}</p>
                    <p>
                      <span className="tag">{capitalize(f.tag)}</span>
                    </p>
                  </div>
                  <div className="comments-counter">
                    <span className="comments-icon material-icons">
                      question_answer
                    </span>
                    <span className="count">{f.commentsCount || 0}</span>
                  </div>
                </div>
                  ))
              )
            : <NoFeedbackYet />
            }
            {!feedback?.data?.filter((f) => f.status === 'planned')?.length && <NoFeedbackYet />}
        </div>
        <div style={selected !== 'in-progress' && isMobile ? { display: 'none' } : { display: 'block' }}>
          {feedback?.data.length
            ? (
                feedback.data
                  .filter((f) => f.status === 'in-progress')
                  .map((f) => (
                <div className="container single-feedback" style={{ borderTop: '5px solid #670979' }} key={f.id}>
                  <div>
                    <button className="upvotes">
                      <span className="material-icons">expand_less</span>
                      <span>{f.upvotes}</span>
                    </button>
                  </div>
                  <div className="status">
                    <span className="circle in-progress material-icons">circle</span><span>In-Progress</span>
                  </div>
                  <div className="feedback-content">
                    <h3 onClick={() => handleFeedbackClicked(f.id)}>{f.title}</h3> <p>{f.description}</p>
                    <p>
                      <span className="tag">{capitalize(f.tag)}</span>
                    </p>
                  </div>
                  <div className="comments-counter">
                    <span className="comments-icon material-icons">
                      question_answer
                    </span>
                    <span className="count">{f.commentsCount || 0}</span>
                  </div>
                </div>
                  ))
              )
            : <NoFeedbackYet />
             }
            {!feedback?.data?.filter((f) => f.status === 'in-progress')?.length && <NoFeedbackYet />}
        </div>
        <div style={selected !== 'live' && isMobile ? { display: 'none' } : { display: 'block' }}>
          {feedback?.data.length
            ? (
                feedback.data
                  .filter((f) => f.status === 'live')
                  .map((f) => (
                <div className="container single-feedback" style={{ borderTop: '5px solid #00d4ff' }} key={f.id}>
                  <div>
                    <button className="upvotes">
                      <span className="material-icons">expand_less</span>
                      <span>{f.upvotes}</span>
                    </button>
                  </div>
                  <div className="status">
                    <span className="circle live material-icons">circle</span><span>Live</span>
                  </div>
                  <div className="feedback-content">
                    <h3 onClick={() => handleFeedbackClicked(f.id)}>{f.title}</h3> <p>{f.description}</p>
                    <p>
                      <span className="tag">{capitalize(f.tag)}</span>
                    </p>
                  </div>
                  <div className="comments-counter">
                    <span className="comments-icon material-icons">
                      question_answer
                    </span>
                    <span className="count">{f.commentsCount || 0}</span>
                  </div>
                </div>
                  ))
              )
            : (
            <Container>No feedback yet</Container>
              )}
             {!feedback?.data?.filter((f) => f.status === 'live')?.length &&
            <Container>No feedback yet</Container>
               }
        </div>
      </div>
    </Main>
  )
}
