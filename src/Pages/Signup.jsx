import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../Components/Container'
import { signup } from '../services/login'
import { setSession } from '../services/session'

export default function Signup () {
  const [formValues, setformValues] = useState(
    { username: '', name: '', lastname: '', email: '', password: '', passwordRetyped: '' })
  const navigate = useNavigate()

  const handleInputChange = ({ target }) => {
    setformValues((currentValues) => ({
      ...currentValues,
      [target.name]: target.value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValues.password === formValues.passwordRetyped) {
      const { username, name, lastname, email, password } = formValues
      const createUser = {
        username, name, lastname, email, password
      }
      try {
        const {
          data: {
            username = ''
          }
        } = await signup(createUser)
        setSession({ username })
        navigate('/login')
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('las contraseñas no coinciden')
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
              />
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
              />
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
              />
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
              />
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
              />
            </div>
            <div>
              <label htmlFor="passwordRetyped">Password</label>
              <input
                onChange={handleInputChange}
                autoComplete="off"
                type="password"
                name="passwordRetyped"
                id="passwordRetyped"
                placeholder=""
                value={formValues.passwordRetyped}
                data-test-id="passwordRetyped-signup-form"
              />
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
        </div>
      </Container>
    </div>
  )
}
