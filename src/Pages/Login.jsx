import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../Components/Container'
import { useAuth } from '../context/AuthProvider'
import { login } from '../services/login'
import { setSession, setTokenInSession } from '../services/session'

export default function Login () {
  const [formValues, setformValues] = useState({ username: '', password: '' })
  const { setLoggedInUser, setToken } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = ({ target }) => {
    setformValues((currentValues) => ({
      ...currentValues,
      [target.name]: target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {
        data:
        { username = '', name = '', lastname = '', thumbnail = '', token = '' }
      } = await login({
        username: formValues.username,
        password: formValues.password
      })
      const user = { username, name, lastname, thumbnail }
      setSession(user)
      setToken(() => {
        setTokenInSession(token)
        return token
      })
      setLoggedInUser(user)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="page-wrapper">
      <Link to='/'>
        {'<'} Go back
      </Link>
      <Container>
        <h1 className="auth-label">Login</h1>
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
                data-test-id="username-login-form"
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
                data-test-id="password-login-form"
              />
            </div>
            <div className="form-buttons">
              <button
              type="submit"
              className="add-feedback"
              id="loginButton-login-form"
              >
                Login
              </button>
              <Link to="/" className="cancel-btn add-feedback">
                Cancel
              </Link>
            </div>
          </form>
          <div style={{textAlign: 'right'}}>Don't have an account yet? <Link to="/signup" style={{textDecoration:'underline'}}>Sign up</Link> </div>
        </div>
      </Container>
    </div>
  )
}
