import React, { createContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { config } from '../config'

export const FeedbackContext = createContext()

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function FeedbackContextProvider ({ children }) {
  const [sortOptions, setSortOptions] = useState()
  const { data: feedback, error } = useSWR(
    `${config.API_URL}/api/v1/feedback${sortOptions ? `?${sortOptions}` : ''}`,
    fetcher
  )
  const [filteredFeedback, setFilteredFeedback] = useState([])
  const [selectedTag, setSelectedTag] = useState('all')
  const [sortBySelected, setSortBySelected] = useState('Most Recent')

  useEffect(() => {
    if (selectedTag !== 'all') {
      const filtered = feedback.data.filter(feedback => feedback.tag === selectedTag)
      setFilteredFeedback(filtered)
    }
  }, [selectedTag])

  return (
    <FeedbackContext.Provider
    value= {{
      feedback,
      error,
      selectedTag,
      setSelectedTag,
      filteredFeedback,
      setFilteredFeedback,
      setSortOptions,
      sortOptions,
      sortBySelected,
      setSortBySelected
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}
