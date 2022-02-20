import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { DomManipulationContextProvider } from './context/DomProvider'
import { FeedbackContextProvider } from './context/FeedbackProvider'
import { AuthContextProvider } from './context/AuthProvider'
import { TagsContextProvider } from './context/TagsProvider'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FeedbackContextProvider>
        <DomManipulationContextProvider>
          <TagsContextProvider>
              <Router>
                <App />
              </Router>
          </TagsContextProvider>
        </DomManipulationContextProvider>
      </FeedbackContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
