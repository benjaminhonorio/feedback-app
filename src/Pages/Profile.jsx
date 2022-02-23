import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../Components/Container'
import Main from '../Components/Main'
import UserInfo from '../Components/UserInfo'


export default function Profile() {

  return (
    <Main className="profile">
      <Container className="roadmap-page-header">
        <div>
          <Link to="/">{'<'} Go back</Link>
          <h3>Profile</h3>
        </div>
      </Container>
      <UserInfo/>
    </Main>
  )
}
