import { MapPin, Building2, Heart, BookOpen, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatNumber } from '../../lib/utils'

export function UserCard({ user, isFavourite, onToggleFavourite }) {
  const handleFavouriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleFavourite(user)
  }

  return (
    <Link 
      to={`/user/${user.login}`}
      className="group flex flex-col bg-[--bg-surface] border border-[--border-subtle] rounded-xl p-5 hover:-translate-y-0.5 hover:border-[--border-default] transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={user.avatar_url} 
            alt={user.login} 
            className="w-16 h-16 rounded-full ring-2 ring-[--border-subtle] group-hover:ring-[--border-default] transition-all"
            loading="lazy"
          />
          <div>
            <h3 className="text-base font-semibold text-[--text-primary] truncate max-w-[140px]" title={user.name || user.login}>
              {user.name || user.login}
            </h3>
            <p className="font-mono text-sm text-[--text-secondary]">@{user.login}</p>
          </div>
        </div>
        <button
          onClick={handleFavouriteClick}
          className={`p-2 rounded-full transition-all active:scale-90 ${isFavourite ? 'text-[--heart] bg-[--heart]/10 animate-heartPop' : 'text-[--text-muted] hover:bg-[--bg-elevated] hover:text-[--text-primary]'}`}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart className={`w-5 h-5 ${isFavourite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {user.bio && (
        <p className="text-sm text-[--text-secondary] leading-relaxed line-clamp-2 mb-4 flex-grow">
          {user.bio}
        </p>
      )}

      <div className="flex flex-col gap-1.5 mt-auto mb-4">
        {user.location && (
          <div className="flex items-center gap-2 text-xs text-[--text-muted]">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{user.location}</span>
          </div>
        )}
        {user.company && (
          <div className="flex items-center gap-2 text-xs text-[--text-muted]">
            <Building2 className="w-3.5 h-3.5" />
            <span className="truncate">{user.company}</span>
          </div>
        )}
      </div>

      <div className="border-t border-[--border-subtle] pt-4 mt-auto">
        <div className="grid grid-cols-3 gap-2 text-center divide-x divide-[--border-subtle]">
          <div className="flex flex-col">
            <span className="font-mono text-sm font-medium text-[--text-primary]">{formatNumber(user.public_repos || 0)}</span>
            <span className="text-[10px] text-[--text-muted] uppercase tracking-wider mt-0.5">Repos</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-medium text-[--text-primary]">{formatNumber(user.followers || 0)}</span>
            <span className="text-[10px] text-[--text-muted] uppercase tracking-wider mt-0.5">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-medium text-[--text-primary]">{formatNumber(user.following || 0)}</span>
            <span className="text-[10px] text-[--text-muted] uppercase tracking-wider mt-0.5">Following</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
