import React from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'

export default function LoginToLeaveComments() {
  return (
    <Container>
      <p>
        Please{' '}
        <Link
          style={{ textDecoration: 'underline', fontWeight: 'bold' }}
          to="/login"
        >
          login
        </Link>{' '}
        to be part of the conversation. If you don't have an account yet, signup{' '}
        <Link
          style={{ textDecoration: 'underline', fontWeight: 'bold' }}
          to="/signup"
        >
          here
        </Link>
      </p>
    </Container>
  )
}
