import { useState, useEffect } from 'react'
import { fetchUser } from '../api/github'

export function useGithubUser(username, setRateLimitError) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return
    let mounted = true

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchUser(username)
        if (mounted) setUser(data)
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

    load()

    return () => {
      mounted = false
    }
  }, [username, setRateLimitError])

  return { user, loading, error }
}
