import { useState, useRef, useEffect } from 'react'
import { Search, X, LoaderCircle } from 'lucide-react'
import { RecentSearches } from './RecentSearches'
import { useRecentSearches } from '../../context/SearchContext'

export function SearchBar({ value, onChange, onSubmit, loading, autoFocus }) {
  const { recentSearches, removeSearch, clearSearches } = useRecentSearches()
  const [showRecent, setShowRecent] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowRecent(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowRecent(false)
      onSubmit()
    }
    if (e.key === 'Escape') {
      setShowRecent(false)
    }
  }

  const handleClear = () => {
    onChange('')
    // Optionally focus input
  }

  const handleSelectRecent = (term) => {
    onChange(term)
    setShowRecent(false)
    // Small timeout to allow state to update before submitting
    setTimeout(() => onSubmit(term), 0)
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative flex items-center">
        <div className="absolute left-4 flex items-center justify-center">
          {loading ? (
            <LoaderCircle className="w-5 h-5 text-[--text-muted] animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-[--text-muted]" />
          )}
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowRecent(true)}
          placeholder="Search GitHub users..."
          autoFocus={autoFocus}
          className="w-full bg-[--bg-elevated] border border-[--border-subtle] rounded-lg pl-12 pr-10 py-3 text-sm text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-[--accent] focus:ring-1 focus:ring-[--accent] transition-colors duration-150"
        />

        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1 text-[--text-muted] hover:text-[--text-primary] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showRecent && recentSearches.length > 0 && (
        <RecentSearches
          searches={recentSearches}
          onSelect={handleSelectRecent}
          onRemove={removeSearch}
          onClearAll={clearSearches}
        />
      )}
    </div>
  )
}
