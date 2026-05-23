import { useState, useEffect } from 'react'
import { fetchTopUsers } from '../api/github'

export function useTopUsers(setRateLimitError) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchTopUsers()
        if (mounted) setUsers(data.items || [])
      } catch (err) {
        if (mounted) {
          setError(err)
          if (err.isRateLimit && setRateLimitError) {
            setRateLimitError({ resetTime: new Date(Date.now() + 60000) }) // Fallback, would be better to read from headers
          }
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [setRateLimitError])

  return { users, loading, error }
}
