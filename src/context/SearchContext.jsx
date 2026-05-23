import { createContext, useContext, useState, useEffect } from 'react'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('gh_recent_searches')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Failed to parse recent searches from localStorage')
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('gh_recent_searches', JSON.stringify(recentSearches))
  }, [recentSearches])

  const addSearch = (term) => {
    if (!term || !term.trim()) return
    const cleanTerm = term.trim()
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== cleanTerm.toLowerCase())
      return [cleanTerm, ...filtered].slice(0, 8)
    })
  }

  const removeSearch = (term) => {
    setRecentSearches((prev) => prev.filter((t) => t !== term))
  }

  const clearSearches = () => {
    setRecentSearches([])
  }

  return (
    <SearchContext.Provider value={{ recentSearches, addSearch, removeSearch, clearSearches }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useRecentSearches() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useRecentSearches must be used within a SearchProvider')
  }
  return context
}
