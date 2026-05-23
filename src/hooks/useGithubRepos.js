import { useState, useEffect, useMemo } from 'react'
import { fetchUserRepos } from '../api/github'

export function useGithubRepos(username, setRateLimitError) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filters state
  const [sort, setSort] = useState('updated') // updated, stars, forks
  const [language, setLanguage] = useState('all')

  useEffect(() => {
    if (!username) return
    let mounted = true

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchUserRepos(username)
        if (mounted) setRepos(data || [])
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

  const { filteredRepos, totalStars, languages } = useMemo(() => {
    let filtered = repos

    // Extract languages before language filter applies
    const langs = Array.from(new Set(filtered.map(r => r.language).filter(Boolean))).sort()

    // 2. Language filter
    if (language !== 'all') {
      filtered = filtered.filter(r => r.language === language)
    }

    // 3. Sort
    filtered = [...filtered].sort((a, b) => {
      if (sort === 'stars') return (b.stargazers_count || 0) - (a.stargazers_count || 0)
      if (sort === 'forks') return (b.forks_count || 0) - (a.forks_count || 0)
      // default: updated
      return new Date(b.updated_at) - new Date(a.updated_at)
    })

    const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)

    return { filteredRepos: filtered, totalStars: stars, languages: langs }
  }, [repos, sort, language])

  return {
    repos,
    filteredRepos,
    totalStars,
    languages,
    loading,
    error,
    filters: { sort, language },
    setSort,
    setLanguage
  }
}
