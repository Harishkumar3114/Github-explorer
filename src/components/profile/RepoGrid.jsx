import { RepoCard } from './RepoCard'
import { RepoCardSkeleton } from './RepoCardSkeleton'
import { EmptyState } from '../ui/EmptyState'

export function RepoGrid({ repos, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <RepoCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!repos || repos.length === 0) {
    return (
      <EmptyState 
        icon="BookOpen"
        heading="No repositories found"
        description="Try adjusting your filters to see more results."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repos.map(repo => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}
