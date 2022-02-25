import React, { createContext, useContext, useState } from 'react'
import useSWR from 'swr'
import { config } from '../config'

const FeedbackContext = createContext()

export function useFeedback () {
  return useContext(FeedbackContext)
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function FeedbackContextProvider ({ children }) {
  const [sortOptions, setSortOptions] = useState('')
  const { data: feedback, error, mutate } = useSWR(
    `${config.API_URL}/api/v1/feedback${sortOptions ? `?${sortOptions}` : ''}`,
    fetcher
  )
  const [filteredFeedback, setFilteredFeedback] = useState([])

  return (
    <FeedbackContext.Provider
    value= {{
      feedback,
      error,
      mutate,
      filteredFeedback,
      setFilteredFeedback,
      setSortOptions,
      sortOptions
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}
