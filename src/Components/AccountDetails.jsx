import React from 'react'

export default function AccountDetails({ user }) {
    const { username, name, lastname, email } = user
    return (
      <ul>
        <li>
          <strong>Username</strong>: {username}
        </li>
        <li>
          <strong>Name</strong>: {name}
        </li>
        <li>
          <strong>Lastname</strong>: {lastname}
        </li>
        <li>
          <strong>Email</strong>: {email}
        </li>
      </ul>
    )
  }