import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export function RepoFilters({ 
  sort, onSortChange, 
  language, onLanguageChange, 
  languages = [] 
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4 mb-6">
      <div className="flex-1 w-full sm:w-auto">
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-full bg-[--bg-elevated] border-[--border-subtle]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Recently Updated</SelectItem>
            <SelectItem value="stars">Most Stars</SelectItem>
            <SelectItem value="forks">Most Forks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 w-full sm:w-auto">
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-full bg-[--bg-elevated] border-[--border-subtle]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {languages.map(lang => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
