import { MapPin, Building2, Link as LinkIcon, Heart, ExternalLink } from 'lucide-react'

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className="w-4 h-4 text-[--text-muted]"
  >
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
)


export function ProfileHeader({ user, isFavourite, onToggleFavourite }) {
  if (!user) return null

  const joinDate = new Date(user.created_at)
  const formattedJoinDate = `Member since ${joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 mb-8 animate-fadeIn">
      <div className="shrink-0 flex justify-center md:block">
        <img 
          src={user.avatar_url || '/placeholder.svg'} 
          alt={user.name || user.login}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-4 ring-[--border-subtle] object-cover"
        />
      </div>

      <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
        <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[--text-primary] mb-1">
              {user.name || user.login}
            </h1>
            <a 
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-lg text-[--text-secondary] hover:text-[--accent] hover:underline transition-colors"
            >
              @{user.login}
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => onToggleFavourite(user)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium text-sm transition-all active:scale-95 ${
                isFavourite 
                  ? 'border-[--heart] text-[--heart] bg-[--heart]/10 animate-heartPop' 
                  : 'border-[--border-subtle] text-[--text-secondary] hover:bg-[--bg-elevated] hover:text-[--text-primary]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavourite ? 'fill-current' : ''}`} />
              {isFavourite ? 'Saved' : 'Save'}
            </button>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[--accent] text-[--accent] font-semibold text-sm hover:bg-[--accent] hover:text-white transition-all active:scale-95"
            >
              View on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {user.bio && (
          <p className="text-[--text-primary] text-sm md:text-base mb-6 max-w-2xl leading-relaxed">
            {user.bio}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-3 gap-x-6 text-sm text-[--text-secondary] mb-4">
          {user.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[--text-muted]" />
              <span>{user.location}</span>
            </div>
          )}
          {user.company && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[--text-muted]" />
              <span>{user.company}</span>
            </div>
          )}
          {user.blog && (
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-[--text-muted]" />
              <a 
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[--accent] transition-colors hover:underline"
              >
                {user.blog.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {user.twitter_username && (
            <div className="flex items-center gap-2">
              <TwitterIcon />
              <a 
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[--accent] transition-colors hover:underline"
              >
                @{user.twitter_username}
              </a>
            </div>
          )}
        </div>

        <p className="text-xs text-[--text-muted]">{formattedJoinDate}</p>
      </div>
    </div>
  )
}
