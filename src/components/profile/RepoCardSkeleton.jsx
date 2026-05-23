export function RepoCardSkeleton() {
  return (
    <div className="flex flex-col bg-[--bg-surface] border border-[--border-subtle] rounded-xl p-5">
      <div className="h-5 w-1/2 bg-[--bg-elevated] animate-pulse rounded-md mb-3" />
      
      <div className="flex flex-col gap-2 mb-6 flex-grow">
        <div className="h-4 w-full bg-[--bg-elevated] animate-pulse rounded-md" />
        <div className="h-4 w-4/5 bg-[--bg-elevated] animate-pulse rounded-md" />
      </div>

      <div className="flex items-center gap-4 mt-auto">
        <div className="h-4 w-16 bg-[--bg-elevated] animate-pulse rounded-md" />
        <div className="h-4 w-12 bg-[--bg-elevated] animate-pulse rounded-md" />
        <div className="h-4 w-12 bg-[--bg-elevated] animate-pulse rounded-md" />
        <div className="h-4 w-20 bg-[--bg-elevated] animate-pulse rounded-md ml-auto" />
      </div>
    </div>
  )
}
