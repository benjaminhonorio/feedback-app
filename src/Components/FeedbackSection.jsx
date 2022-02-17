import React from 'react'
import FeedbackSectionHeader from './FeedbackSectionHeader'
import FeedbackSectionList from './FeedbackSectionList'

export default function FeedbackSection () {
  return (
    <section className="feedback">
      <FeedbackSectionHeader/>
      <FeedbackSectionList/>
    </section>
  )
}
