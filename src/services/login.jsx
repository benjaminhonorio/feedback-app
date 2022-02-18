import axios from 'axios'
import { config } from '../config'

export async function login (credentials) {
  const response = await axios.post(`${config.API_URL}/api/v1/users/login`, credentials)
  return response.data
}

export async function signup (userData) {
  const response = await axios.post(`${config.API_URL}/api/v1/users`, userData)
  return response.data
}

export default { login, signup }
