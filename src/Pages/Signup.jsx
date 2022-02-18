import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../Components/Container'

export default function Signup () {
  return (
    <div className="page-wrapper">
      <Link to="/">{'<'} Go back</Link>
      <Container>
        <h1 className="auth-label">Signup</h1>
        <div className="form-container">
          <form noValidate autoComplete='off'>
            <div>
              <label htmlFor="username">Username</label>
              <input autoComplete='off' type="text" name="username" id="username" placeholder=""/>
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input autoComplete='off' type="text" name="name" id="name" placeholder=""/>
            </div>
            <div>
              <label htmlFor="lastname">Lastname</label>
              <input autoComplete='off' type="text" name="lastname" id="lastname" placeholder=""/>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input autoComplete='off' type="email" name="email" id="email" placeholder=""/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input autoComplete='off' type="password" name="password" id="password" placeholder=""/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input autoComplete='off' type="password" name="password" id="password" placeholder=""/>
            </div>
            <div className="form-buttons">
                <a href="" className="add-feedback">Sign Up</a>
                <Link to="/" className="cancel-btn add-feedback" >Cancel</Link>
            </div>
          </form>
          </div>
      </Container>
    </div>
  )
}
