import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../Components/Container'
import { signup } from '../services/login'
import { setSession } from '../services/session'

export default function Signup () {
  const [formValues, setformValues] = useState(
    { username: '', name: '', lastname: '', email: '', password: '', passwordConfirmation: '' })
  const [formErrors, setFormErrors] = useState({username: '', name: '', lastname: '', email: '', password: '', passwordConfirmation: ''})
  const navigate = useNavigate()

  const handleInputChange = ({ target }) => {
    setformValues((currentValues) => ({
      ...currentValues,
      [target.name]: target.value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
      const { username, name, lastname, email, password, passwordConfirmation } = formValues
      const createUser = {
        username, name, lastname, email, password, passwordConfirmation
      }
      try {
        setFormErrors({username: '', name: '', lastname: '', email: '', password: '', passwordConfirmation: ''})
        const {
          data: {
            username = ''
          }
        } = await signup(createUser)
        setSession({ username })
        navigate('/login')
      } catch (error) {
        // const errorMessages = error.response.data.message
        setFormErrors(error.response.data.message)
      }
  }
  return (
    <div className="page-wrapper">
      <Link to="/">{'<'} Go back</Link>
      <Container>
        <h1 className="auth-label">Signup</h1>
        <div className="form-container">
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                onChange={handleInputChange}
                autoComplete="off"
                type="text"
                name="username"
                id="username"
                placeholder=""
                value={formValues.username}
                data-test-id="username-signup-form"
                className={formErrors.username && 'form-error-input'}
              />
              {formErrors.username && <p className="form-error-message">{formErrors.username}</p>}
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                onChange={handleInputChange}
                autoComplete="off"
                type="text"
                name="name"
                id="name"
                placeholder=""
                value={formValues.name}
                data-test-id="name-signup-form"
                className={formErrors.name && 'form-error-input'}
              />
              {formErrors.name && <p className="form-error-message">{formErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="lastname">Lastname</label>
              <input
                onChange={handleInputChange}
                autoComplete="off"
                type="text"
                name="lastname"
                id="lastname"
                placeholder=""
                value={formValues.lastname}
                data-test-id="lastname-signup-form"
                className={formErrors.lastname && 'form-error-input'}
              />
              {formErrors.lastname && <p className="form-error-message">{formErrors.lastname}</p>}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                onChange={handleInputChange}
                autoComplete="off"
                type="email"
                name="email"
                id="email"
                placeholder=""
                value={formValues.email}
                data-test-id="email-signup-form"
                className={formErrors.email && 'form-error-input'}
              />
              {formErrors.email && <p className="form-error-message">{formErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                onChange={handleInputChange}
                autoComplete="off"
                type="password"
                name="password"
                id="password"
                placeholder=""
                value={formValues.password}
                data-test-id="password-signup-form"
                className={formErrors.password && 'form-error-input'}
                />
                {formErrors.password && <p className="form-error-message">{formErrors.password}</p>}
            </div>
            <div>
              <label htmlFor="passwordConfirmation">Confirmation Password</label>
              <input
                onChange={handleInputChange}
                autoComplete="off"
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                placeholder=""
                value={formValues.passwordConfirmation}
                data-test-id="passwordConfirmation-signup-form"
                className={formErrors.passwordConfirmation && 'form-error-input'}
                />
                {formErrors.passwordConfirmation && <p className="form-error-message">{formErrors.passwordConfirmation}</p>}
            </div>
            <div className="form-buttons">
              <button
              type="submit"
              className="add-feedback"
              id="signupButton-signup-form"
              >
                Sign Up
              </button>
              <Link to="/" className="cancel-btn add-feedback">
                Cancel
              </Link>
            </div>
          </form>
          <div style={{textAlign: 'right'}}>Already have an account? <Link to="/login" style={{textDecoration:'underline'}}>Login</Link> </div>
        </div>
      </Container>
    </div>
  )
}
