import { Star, GitFork } from 'lucide-react'
import { formatNumber, getLanguageColor } from '../../lib/utils'

export function RepoCard({ repo }) {
  return (
    <a 
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-[--bg-surface] border border-[--border-subtle] rounded-xl p-5 hover:border-[--accent]/50 hover:bg-[--accent]/5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-base font-semibold text-[--text-primary] group-hover:text-[--accent] transition-colors truncate">
          {repo.name}
        </h3>
        {repo.fork && (
          <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full border border-[--border-subtle] text-[--text-muted]">
            Fork
          </span>
        )}
      </div>

      <p className="text-sm text-[--text-secondary] line-clamp-2 mb-6 flex-grow">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex items-center flex-wrap gap-4 text-xs text-[--text-muted] mt-auto">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            <span>{repo.language}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-[--text-muted]" />
          <span>{formatNumber(repo.stargazers_count || 0)}</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <GitFork className="w-4 h-4 text-[--text-muted]" />
          <span>{formatNumber(repo.forks_count || 0)}</span>
        </div>
      </div>
    </a>
  )
}
