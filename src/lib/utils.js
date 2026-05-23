import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n) {
  if (!n) return '0'
  if (n < 1000) return n.toString()
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
}

export function timeAgo(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)
  
  if (seconds < 60) return `just now`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} ${days === 1 ? 'day' : 'days'} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`
  const years = Math.floor(days / 365)
  return `${years} ${years === 1 ? 'year' : 'years'} ago`
}

export function getLanguageColor(lang) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572a5',
    'Go': '#00add8',
    'Rust': '#dea584',
    'Java': '#b07219',
    'CSS': '#563d7c',
  }
  return colors[lang] || 'var(--border-default)'
}

export function buildSearchQuery({ query, location, minFollowers }) {
  const parts = []
  if (query) parts.push(`${encodeURIComponent(query)}+in:login`)
  if (location) parts.push(`location:${encodeURIComponent(location)}`)
  if (minFollowers) parts.push(`followers:>${encodeURIComponent(minFollowers)}`)
  return parts.join('+') || 'followers:>0'
}
