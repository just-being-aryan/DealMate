'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface SwipedMatch {
  id: string
  name: string
  company: string
  avatar: string
  status: string
  time: string
  badge: string
  userType?: 'buyer' | 'seller'
 
  description?: string
  value?: number
  location?: string
  industry?: string
}

interface SwipedMatchesContextType {
  rightSwipedMatches: SwipedMatch[]
  leftSwipedMatches: SwipedMatch[]
  addRightSwipe: (match: SwipedMatch) => void
  addLeftSwipe: (match: SwipedMatch) => void
  removeMatch: (matchId: string) => void
  isMatchRightSwiped: (matchId: string) => boolean
  isMatchLeftSwiped: (matchId: string) => boolean
  clearAllMatches: () => void
}

const SwipedMatchesContext = createContext<SwipedMatchesContextType | undefined>(undefined)

export const useSwipedMatches = () => {
  const context = useContext(SwipedMatchesContext)
  if (!context) {
    throw new Error('useSwipedMatches must be used within a SwipedMatchesProvider')
  }
  return context
}

interface SwipedMatchesProviderProps {
  children: ReactNode
}

export const SwipedMatchesProvider: React.FC<SwipedMatchesProviderProps> = ({ children }) => {
  const [rightSwipedMatches, setRightSwipedMatches] = useState<SwipedMatch[]>([])
  const [leftSwipedMatches, setLeftSwipedMatches] = useState<SwipedMatch[]>([])

  const addRightSwipe = (match: SwipedMatch) => {
    setRightSwipedMatches(prev => {
    
      setLeftSwipedMatches(leftPrev => leftPrev.filter(m => m.id !== match.id))
      
    
      if (prev.find(m => m.id === match.id)) {
        return prev // Already exists
      }
      return [...prev, match]
    })
  }

  const addLeftSwipe = (match: SwipedMatch) => {
    setLeftSwipedMatches(prev => {
      
      setRightSwipedMatches(rightPrev => rightPrev.filter(m => m.id !== match.id))
      
    
      if (prev.find(m => m.id === match.id)) {
        return prev // Already exists
      }
      return [...prev, match]
    })
  }

  const removeMatch = (matchId: string) => {
    setRightSwipedMatches(prev => prev.filter(m => m.id !== matchId))
    setLeftSwipedMatches(prev => prev.filter(m => m.id !== matchId))
  }

  const isMatchRightSwiped = (matchId: string) => {
    return rightSwipedMatches.some(m => m.id === matchId)
  }

  const isMatchLeftSwiped = (matchId: string) => {
    return leftSwipedMatches.some(m => m.id === matchId)
  }

  const clearAllMatches = () => {
    setRightSwipedMatches([])
    setLeftSwipedMatches([])
  }

  const value: SwipedMatchesContextType = {
    rightSwipedMatches,
    leftSwipedMatches,
    addRightSwipe,
    addLeftSwipe,
    removeMatch,
    isMatchRightSwiped,
    isMatchLeftSwiped,
    clearAllMatches
  }

  return (
    <SwipedMatchesContext.Provider value={value}>
      {children}
    </SwipedMatchesContext.Provider>
  )
}
