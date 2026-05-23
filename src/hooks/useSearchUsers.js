import { useState, useEffect } from 'react'
import { searchUsers } from '../api/github'
import { useDebounce } from './useDebounce'

export function useSearchUsers(params, setRateLimitError) {
  const { query, location, minFollowers, sort } = params
  const debouncedQuery = useDebounce(query, 400)
  const debouncedLocation = useDebounce(location, 400)

  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1)
    setUsers([])
  }, [debouncedQuery, debouncedLocation, minFollowers, sort])

  useEffect(() => {
    // If empty search, we can just skip or let it fetch 'followers:>0'
    // The UI handles showing top users if query is fully cleared, so this hook might not even render,
    // but just in case:
    let mounted = true

    async function fetchResults() {
      try {
        setLoading(true)
        setError(null)
        const data = await searchUsers({
          query: debouncedQuery,
          location: debouncedLocation,
          minFollowers,
          sort,
          page
        })

        if (mounted) {
          if (page === 1) {
            setUsers(data.items || [])
          } else {
            setUsers((prev) => [...prev, ...(data.items || [])])
          }
          setTotal(data.total_count || 0)
          setHasMore(data.items?.length === 24)
        }
      } catch (err) {
        if (mounted) {
          setError(err)
          if (err.isRateLimit && setRateLimitError) {
            setRateLimitError({ resetTime: new Date(Date.now() + 60000) })
          }
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchResults()

    return () => {
      mounted = false
    }
  }, [debouncedQuery, debouncedLocation, minFollowers, sort, page, setRateLimitError])

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((p) => p + 1)
    }
  }

  return { users, total, loading, error, loadMore, hasMore }
}
