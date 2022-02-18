export function getSession () {
  return JSON.parse(sessionStorage.getItem('user'))
}

export function setSession (userData) {
  return sessionStorage.setItem('user', JSON.stringify(userData))
}
export function clearSession () {
  sessionStorage.removeItem('user')
  sessionStorage.removeItem('token')
}

export function setToken (token) {
  return sessionStorage.setItem('token', JSON.stringify(token))
}

export function getToken () {
  return sessionStorage.getItem('token')
}

export default { getSession, setSession, clearSession, setToken, getToken }
