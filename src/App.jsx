import React from 'react'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './Pages/PageNotFound'
import NewFeedback from './Pages/NewFeedback'
import EditFeedback from './Pages/EditFeedback'
import FeedbackDetail from './Pages/FeedbackDetail'
import Roadmap from './Pages/Roadmap'

export default function App () {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/feedback/:id" element={<FeedbackDetail />} />
      <Route path="/feedback/:id/edit" element={<EditFeedback />} />
      <Route path="/feedback/new" element={<NewFeedback />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}
