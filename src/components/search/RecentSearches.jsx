import { Clock, X } from 'lucide-react'

export function RecentSearches({ searches, onSelect, onRemove, onClearAll }) {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[--bg-surface] border border-[--border-subtle] rounded-lg shadow-xl overflow-hidden z-50 animate-fadeIn">
      <div className="py-2">
        {searches.map((term, index) => (
          <div 
            key={`${term}-${index}`}
            className="flex items-center justify-between px-4 py-2.5 hover:bg-[--bg-elevated] cursor-pointer group"
            onClick={() => onSelect(term)}
          >
            <div className="flex items-center gap-3 text-sm text-[--text-primary]">
              <Clock className="w-4 h-4 text-[--text-muted]" />
              <span>{term}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemove(term)
              }}
              className="p-1 text-[--text-muted] hover:text-[--text-primary] opacity-0 group-hover:opacity-100 transition-all"
              aria-label="Remove search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="border-t border-[--border-subtle] px-4 py-2">
        <button
          onClick={onClearAll}
          className="text-xs text-[--text-muted] hover:text-[--text-primary] transition-colors"
        >
          Clear all recent searches
        </button>
      </div>
    </div>
  )
}
