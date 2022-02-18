import axios from 'axios'
import { config } from '../config'

export async function getFeedback (id, token) {
  const response = await axios.get(`${config.API_URL}/api/v1/feedback/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export async function createFeedback (feedbackData, token) {
  const response = await axios.post(`${config.API_URL}/api/v1/feedback`, feedbackData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export async function updateFeedback (feedbackData, id, token) {
  const response = await axios.put(`${config.API_URL}/api/v1/feedback/${id}`, feedbackData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export async function deleteFeedback (id, token) {
  const response = await axios.delete(`${config.API_URL}/api/v1/feedback/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export default { getFeedback, createFeedback, updateFeedback, deleteFeedback }
