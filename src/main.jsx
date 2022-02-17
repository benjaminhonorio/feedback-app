import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { DomManipulationContextProvider } from './context/DomManipulationContext'
import { FeedbackContextProvider } from './context/FeedbackContext'

ReactDOM.render(
  <React.StrictMode>
    <FeedbackContextProvider>
      <DomManipulationContextProvider>
        <Router>
          <App />
        </Router>
      </DomManipulationContextProvider>
    </FeedbackContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
