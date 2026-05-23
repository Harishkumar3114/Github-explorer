import { useState, useEffect } from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { SearchBar } from '../components/search/SearchBar'
import { SearchFilters } from '../components/search/SearchFilters'
import { UserGrid } from '../components/user/UserGrid'
import { useTopUsers } from '../hooks/useTopUsers'
import { useSearchUsers } from '../hooks/useSearchUsers'
import { ErrorState } from '../components/ui/ErrorState'
import { EmptyState } from '../components/ui/EmptyState'
import { useRecentSearches } from '../context/SearchContext'

export function HomePage({ setRateLimitError }) {
  const [searchQuery, setSearchQuery] = useState(() => {
  try {
    const saved = sessionStorage.getItem('gh_home_state');
    if (saved) {
      const { savedQuery } = JSON.parse(saved);
      return savedQuery ?? '';
    }
  } catch (e) {
    console.error('Failed to read home state', e);
  }
  return '';
});

const [filters, setFilters] = useState(() => {
  try {
    const saved = sessionStorage.getItem('gh_home_state');
    if (saved) {
      const { savedFilters } = JSON.parse(saved);
      return savedFilters ?? { location: '', minFollowers: '', sort: 'followers' };
    }
  } catch (e) {
    console.error('Failed to read home state', e);
  }
  return { location: '', minFollowers: '', sort: 'followers' };
});

  const { addSearch } = useRecentSearches()

  const { 
    users: topUsers, 
    loading: topLoading, 
    error: topError 
  } = useTopUsers(setRateLimitError)

  const { 
    users: searchResults, 
    total, 
    loading: searchLoading, 
    error: searchError, 
    loadMore, 
    hasMore 
  } = useSearchUsers({ 
    query: searchQuery, 
    location: filters.location, 
    minFollowers: filters.minFollowers, 
    sort: filters.sort 
  }, setRateLimitError)

  const isSearchMode = searchQuery.trim() !== '' || filters.location !== '' || filters.minFollowers !== '' || filters.sort !== 'followers'

  // Restore state from sessionStorage on mount
  useEffect(() => {
    try {
      const savedState = sessionStorage.getItem('gh_home_state')
      if (savedState) {
        const { savedQuery, savedFilters } = JSON.parse(savedState)
        if (savedQuery !== undefined) setSearchQuery(savedQuery)
        if (savedFilters) setFilters(savedFilters)
      }
    } catch (e) {
      console.error('Failed to restore home state', e)
    }
  }, [])

  // Save state to sessionStorage before unmount or on change
  useEffect(() => {
    sessionStorage.setItem('gh_home_state', JSON.stringify({ savedQuery: searchQuery, savedFilters: filters }))
  }, [searchQuery, filters])

  const handleSearchSubmit = (term) => {
    const queryToSave = term !== undefined ? term : searchQuery
    if (queryToSave.trim()) {
      addSearch(queryToSave)
    }
  }

  const handleRetryTop = () => {
    window.location.reload()
  }

  return (
    <PageWrapper>
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-semibold text-[--text-primary] mb-1">Discover Developers</h1>
        <p className="text-sm text-[--text-secondary]">Explore the most followed engineers on GitHub</p>
      </div>

      <div className="mb-8 flex flex-col gap-2">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearchSubmit}
          loading={isSearchMode && searchLoading}
        />
        <div className="hidden md:block">
          <SearchFilters filters={filters} onChange={setFilters} />
        </div>
        <div className="md:hidden mt-2">
          {/* Mobile collapsible filters could be implemented here. For now, just show them. */}
          <SearchFilters filters={filters} onChange={setFilters} />
        </div>
      </div>

      {isSearchMode ? (
        <div className="animate-fadeIn">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium text-[--text-primary]">
              {total > 0 ? `${total.toLocaleString()} results` : 'Search results'}
              {searchQuery && ` for "${searchQuery}"`}
            </h2>
          </div>

          {searchError ? (
            <ErrorState message={searchError.message} />
          ) : !searchLoading && searchResults.length === 0 ? (
            <EmptyState 
              icon="SearchX"
              heading="No users found"
              description="Try adjusting your search or filters to find what you're looking for."
              ctaLabel="Clear filters"
              ctaHref="#"
              onClickCta={(e) => {
                  e.preventDefault()
                  setSearchQuery('')
                  setFilters({ location: '', minFollowers: '', sort: 'followers' })
                  sessionStorage.removeItem('gh_home_state')
                }}
            />
          ) : (
            <>
              <UserGrid users={searchResults} loading={searchLoading && searchResults.length === 0} />
              
              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={loadMore}
                    disabled={searchLoading}
                    className="bg-[--bg-surface] border border-[--border-subtle] text-[--text-secondary] font-medium text-sm rounded-lg px-6 py-2.5 hover:bg-[--bg-elevated] hover:text-[--text-primary] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {searchLoading ? 'Loading...' : 'Load more'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="animate-fadeIn">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[--text-primary]">
              Top Users
            </h2>
          </div>
          {topError ? (
            <ErrorState message={topError.message} onRetry={handleRetryTop} />
          ) : (
            <UserGrid users={topUsers} loading={topLoading} />
          )}
        </div>
      )}
    </PageWrapper>
  )
}
