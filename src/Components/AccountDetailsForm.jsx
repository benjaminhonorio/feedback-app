import axios from 'axios'
import React, { useState } from 'react'
import { config } from '../config'
import { getTokenFromSesion } from '../services/session'

export default function AccountDetailsForm({ user, thumbnail, edit, setEdit }) {
    const token = getTokenFromSesion()
  
    const [values, setValues] = useState(() => {
      const { username, name, lastname, email } = user
      return { username, name, lastname, email }
    })
  
    const handleInputChange = ({ target }) => {
      setValues((values) => ({ ...values, [target.name]: target.value }))
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      const { username, name, lastname, email } = values
      const newUserData = { username, name, lastname, email, thumbnail }
      axios.put(`${config.API_URL}/api/v1/users/${user.id}`, newUserData, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch((error) => {console.error(error)})
      setValues({...values, ...newUserData})
      setEdit(!edit)
    }
    const handleCancel = (e) => {
      e.preventDefault()
      setEdit(!edit)
  
    }
  
    return (
      <form
        onSubmit={handleSubmit}
        id="account-form"
        className="account-details-form"
      >
        <label>
          <strong>Username:</strong>
          <input
            onChange={handleInputChange}
            type="text"
            name="username"
            value={values.username}
          />
        </label>
        <label>
          <strong>Name:</strong>
          <input
            onChange={handleInputChange}
            type="text"
            name="name"
            value={values.name}
          />
        </label>
        <label>
          <strong>Lastname:</strong>
          <input
            onChange={handleInputChange}
            type="text"
            name="lastname"
            value={values.lastname}
          />
        </label>
        <label>
          <strong>Email:</strong>
          <input
            onChange={handleInputChange}
            type="email"
            name="email"
            value={values.email}
          />
        </label>
        <button onClick={handleCancel} className="cancel account-details-btn">Cancel</button>
        <button type="submit" className="account-details-btn">Save&nbsp;Changes</button>
      </form>
    )
  }
  
