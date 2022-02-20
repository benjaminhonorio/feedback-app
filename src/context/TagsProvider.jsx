import React, { useState, createContext, useEffect, useContext } from 'react'
import { useFeedback } from '../context/FeedbackProvider'

export const TagsContext = createContext()

export function useTags () {
  return useContext(TagsContext)
}
export function TagsContextProvider ({ children }) {
  const [selectedTag, setSelectedTag] = useState('all')
  const { feedback = [], setFilteredFeedback } = useFeedback()

  useEffect(() => {
    if (selectedTag !== 'all') {
      const filtered = feedback?.data?.filter(feedback => feedback.tag === selectedTag) || []
      setFilteredFeedback(filtered)
    }
  }, [selectedTag])

  const context = {
    selectedTag, setSelectedTag
  }
  return <TagsContext.Provider value={context}>{children}</TagsContext.Provider>
}
