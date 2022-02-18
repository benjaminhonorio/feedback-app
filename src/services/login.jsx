import axios from 'axios'
import { config } from '../config'

export default async function login (credentials) {
  const response = await axios.post(`${config.API_URL}/api/v1/users/login`, credentials)
  return response.data
}
