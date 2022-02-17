import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function BaseFormFeedback (props) {
  const [values, setValues] = useState({ title: '', tag: '', status: '', description: '' })

  useEffect(() => {
    if (props.type === 'edit') {
      const { title, tag, status, description } = props.feedback
      setValues({ title, tag, status, description })
    }
  }, [])

  const handleInputChange = ({ target }) => {
    setValues((state) => ({ ...state, [target.name]: target.value }))
  }

  return (
    <>
      <div className="page-wrapper">
        <Link to="/">{'<'} Go back</Link>
        <div className="container">
        <span className="material-icons plus-icon">
            {props.topFormIcon}
        </span>
          <div className="form-container">
          <h2>{props.formTitle}</h2>
          <form noValidate autoComplete='off'>
            <div>
              <label htmlFor="title">Feedback Title</label>
              <p>Add a short, descriptive title</p>
              <input type="text" name="title" id="title" placeholder="" onChange={handleInputChange}
                  value={values.title}/>
            </div>
            <div>
              <label htmlFor="tag">Category</label>
              <p>Choose a category for your feedback</p>
              <select name="tag" id="tag" placeholder="" onChange={handleInputChange}
                  value={values.tag}>
                <option value=""></option>
                <option value="feature">Feature</option>
                <option value="enhancement">Enhancement</option>
                <option value="bug">Bug</option>
                <option value="ui">UI</option>
                <option value="ux">UX</option>
              </select>
            </div>
            {props.user?.admin
              ? <div>
              <label htmlFor="status">Update Status</label>
              <p>Change feature status</p>
              <select name="status" id="status" placeholder="" onChange={handleInputChange}
                  value={values.status}>
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
                  value={values.description}></textarea>
            </div>
            <div className="form-buttons">
                <Link to={props.type === 'create' ? '/' : `/feedback/${props.feedback.id}`} className="cancel-btn add-feedback" >Cancel</Link>
                <a href="" className="add-feedback">{props.formSaveButtonLabel}</a>
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  )
}
