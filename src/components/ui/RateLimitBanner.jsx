import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export function RateLimitBanner({ resetTime, onDismiss }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    if (!resetTime) return

    const updateTimer = () => {
      const now = new Date()
      const diff = resetTime - now
      
      if (diff <= 0) {
        setTimeLeft('')
        onDismiss() // Auto dismiss when time is up
        return
      }

      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [resetTime, onDismiss])

  if (!timeLeft) return null

  return (
    <div className="sticky top-14 z-40 bg-[--warning]/10 border-b border-[--warning]/30 text-[--warning] px-4 py-2 flex items-center justify-between animate-fadeIn">
      <p className="text-sm font-medium">
        GitHub API rate limit reached. Resets in {timeLeft}
      </p>
      <button
        onClick={onDismiss}
        className="p-1 hover:bg-[--warning]/20 rounded transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
