import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound () {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      height: '100vh',
      background: 'linear-gradient(133deg, rgba(0, 212, 255, 1) 0%, rgba(74, 65, 158, 1) 30%, rgba(103, 9, 121, 1) 67%, rgba(199, 89, 43, 1) 100% )'
    },
    button: {
      marginTop: '1rem'
    }
  }
  return (
    <div style={styles.container}>
        <h1>Page not found</h1>
        <h3>Looks like you are lost</h3>
        <p>The page you are looking for might be removed or is temporally unavailable</p>
        <Link style={styles.button} className="tag" to={'/'}>Go Back Home</Link>
    </div>
  )
}
