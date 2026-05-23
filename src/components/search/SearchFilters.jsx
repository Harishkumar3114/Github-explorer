import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export function SearchFilters({ filters, onChange }) {
  const hasActiveFilters = 
    filters.location !== '' || 
    filters.minFollowers !== '' || 
    filters.sort !== 'followers'

  const handleClear = () => {
    onChange({ location: '', minFollowers: '', sort: 'followers' })
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4 w-full bg-[--bg-base]">
      <div className="flex-1 w-full sm:w-auto">
        <input
          type="text"
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
          placeholder="Location (e.g. India)"
          className="w-full bg-[--bg-elevated] border border-[--border-subtle] rounded-lg px-4 py-2.5 text-sm text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-[--accent] transition-colors duration-150"
        />
      </div>
      
      <div className="flex-1 w-full sm:w-auto">
        <Select 
          value={filters.minFollowers} 
          onValueChange={(val) => onChange({ ...filters, minFollowers: val === 'any' ? '' : val })}
        >
          <SelectTrigger className="w-full bg-[--bg-elevated] border-[--border-subtle]">
            <SelectValue placeholder="Min Followers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Followers</SelectItem>
            <SelectItem value="100">100+</SelectItem>
            <SelectItem value="1000">1K+</SelectItem>
            <SelectItem value="10000">10K+</SelectItem>
            <SelectItem value="100000">100K+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 w-full sm:w-auto">
        <Select 
          value={filters.sort} 
          onValueChange={(val) => onChange({ ...filters, sort: val })}
        >
          <SelectTrigger className="w-full bg-[--bg-elevated] border-[--border-subtle]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="followers">Most Followers</SelectItem>
            <SelectItem value="repositories">Most Repositories</SelectItem>
            <SelectItem value="joined">Recently Joined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="w-full sm:w-auto sm:ml-auto">
          <button
            onClick={handleClear}
            className="w-full sm:w-auto text-sm font-medium text-[--text-muted] hover:text-[--text-primary] transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
