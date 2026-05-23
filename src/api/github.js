import { GITHUB_API_BASE } from './constants'

export class ApiError extends Error {
  constructor(status, body) {
    super(body?.message || 'API Error')
    this.status = status
    this.isRateLimit = status === 403 && body?.message?.includes('rate limit')
    this.isNotFound = status === 404
  }
}

const cache = new Map()

const getHeaders = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

async function cachedFetch(url) {
  if (cache.has(url)) return cache.get(url)
  const res = await fetch(url, { headers: getHeaders() })
  
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(res.status, body)
  }
  
  const data = await res.json()
  cache.set(url, data)
  return data
}

export async function fetchTopUsers() {
  const url = `${GITHUB_API_BASE}/search/users?q=followers:>10000&sort=followers&order=desc&per_page=24&page=1`
  const data = await cachedFetch(url)
  if (data.items && data.items.length > 0) {
    data.items = await Promise.all(
      data.items.map(user => fetchUser(user.login).catch(() => user))
    )
  }
  return data
}

export async function searchUsers({ query, location, minFollowers, sort, page = 1 }) {
  const parts = []
  if (query) parts.push(`${encodeURIComponent(query)}+in:login`)
  if (location) parts.push(`location:${encodeURIComponent(location)}`)
  if (minFollowers) parts.push(`followers:>${encodeURIComponent(minFollowers)}`)
  
  const qStr = parts.length > 0 ? parts.join('+') : 'followers:>0'
  
  let sortParam = ''
  if (sort === 'repositories') sortParam = '&sort=repositories'
  if (sort === 'joined') sortParam = '&sort=joined'
  if (sort === 'followers') sortParam = '&sort=followers'

  const url = `${GITHUB_API_BASE}/search/users?q=${qStr}${sortParam}&order=desc&per_page=24&page=${page}`
  const data = await cachedFetch(url)
  if (data.items && data.items.length > 0) {
    data.items = await Promise.all(
      data.items.map(user => fetchUser(user.login).catch(() => user))
    )
  }
  return data
}

export async function fetchUser(username) {
  const url = `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}`
  return cachedFetch(url)
}

export async function fetchUserRepos(username) {
  const url = `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&page=1`
  return cachedFetch(url)
}

export async function checkRateLimit() {
  const res = await fetch(`${GITHUB_API_BASE}/rate_limit`, { headers: getHeaders() })
  return res.json()
}
