import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createFeedback, updateFeedback } from '../services/feedback'
import { useFeedback } from '../context/FeedbackProvider'
import { useAuth } from '../context/AuthProvider'

const initialState = { title: '', tag: '', status: '', description: '' }

export default function BaseFormFeedback (props) {
  const [formValues, setFormValues] = useState(() => initialState)
  const { mutate } = useFeedback()
  const navigate = useNavigate()
  const { token } = useAuth()
  const user = props.user
  useEffect(() => {
    if (props.type === 'edit') {
      const { title, tag, status, description } = props.feedback
      if (user.admin) {
        setFormValues({ title, tag, status, description })
      } else {
        setFormValues({ title, tag, description })
      }
    }
  }, [props.feedback])
  const handleInputChange = ({ target }) => {
    setFormValues((state) => ({ ...state, [target.name]: target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (props.type === 'edit') {
      try {
        const { data } = await updateFeedback(formValues, props.feedback.id, token)
        mutate(true)
        navigate(`/feedback/${data.id}`)
      } catch (error) {
        console.log(error)
      }
    } else if (props.type === 'create') {
      try {
        const { data } = await createFeedback(formValues, token)
        mutate(true)
        setFormValues(initialState)
        navigate(`/feedback/${data.id}`)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className="page-wrapper">
      <a href="#" onClick={() => navigate(-1)}>{'<'} Go back</a>
        <div className="container">
        <span className="material-icons plus-icon">
            {props.topFormIcon}
        </span>
          <div className="form-container">
          <h2>{props.formTitle}</h2>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Feedback Title</label>
              <p>Add a short, descriptive title</p>
              <input type="text" name="title" id="title" placeholder="" onChange={handleInputChange}
                  value={formValues.title}/>
            </div>
            <div>
              <label htmlFor="tag">Category</label>
              <p>Choose a category for your feedback</p>
              <select name="tag" id="tag" placeholder="" onChange={handleInputChange}
                  value={formValues.tag}>
                <option value=""></option>
                <option value="feature">Feature</option>
                <option value="enhancement">Enhancement</option>
                <option value="bug">Bug</option>
                <option value="ui">UI</option>
                <option value="ux">UX</option>
              </select>
            </div>
            {user?.admin
              ? <div>
              <label htmlFor="status">Update Status</label>
              <p>Change feature status</p>
              <select name="status" id="status" placeholder="" onChange={handleInputChange}
                  value={formValues.status}>
                <option value=""></option>
                <option value="planned">Planned</option>
                <option value="in-progress">In-Progress</option>
                <option value="live">Live</option>
              </select>
            </div>
              : null}
            <div>
              <label>Feedback Detail</label>
              <p>Include any specific comments on what should be improved, added, etc.</p>
              <textarea name="description" rows="8" onChange={handleInputChange}
                  value={formValues.description}></textarea>
            </div>
            <div className="form-buttons">
                <Link to={props.type === 'create' ? '/' : `/feedback/${props.feedback.id}`} className="cancel-btn add-feedback" >Cancel</Link>
                <button className="add-feedback">{props.formSaveButtonLabel}</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  )
}
