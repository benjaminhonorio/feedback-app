import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../Components/Container'

export default function Login () {
  const navigate = useNavigate()
  return (
    <div className="page-wrapper">
      <a href="#" onClick={() => navigate(-1)}>{'<'} Go back</a>
      <Container>
        <h1 className="auth-label">Login</h1>
        <div className="form-container">
          <form noValidate autoComplete='off'>
            <div>
              <label htmlFor="username">Username</label>
              <input autoComplete='off' type="text" name="username" id="username" placeholder=""/>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input autoComplete='off' type="password" name="password" id="password" placeholder=""/>
            </div>
            <div className="form-buttons">
                <a href="" className="add-feedback">Login</a>
                <Link to="/" className="cancel-btn add-feedback" >Cancel</Link>
            </div>
          </form>
          </div>
      </Container>
    </div>
  )
}
