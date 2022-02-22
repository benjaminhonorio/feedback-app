import React from 'react'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './Pages/PageNotFound'
import NewFeedback from './Pages/NewFeedback'
import EditFeedback from './Pages/EditFeedback'
import FeedbackDetail from './Pages/FeedbackDetail'
import Roadmap from './Pages/Roadmap'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import PrivateRoute from './Components/PrivateRoute'
import Profile from './Pages/Profile'

export default function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback/:id" element={<FeedbackDetail />} />
        <Route
          path="/feedback/:id/edit"
          element={
            <PrivateRoute>
              <EditFeedback />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback/new"
          element={
            <PrivateRoute>
              <NewFeedback />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
