import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { DomManipulationContextProvider } from './context/DomManipulationContext'
import { FeedbackContextProvider } from './context/FeedbackContext'
import AuthContextProvider from './context/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FeedbackContextProvider>
        <DomManipulationContextProvider>
          <Router>
            <App />
          </Router>
        </DomManipulationContextProvider>
      </FeedbackContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
