export function UserCardSkeleton() {
  return (
    <div className="flex flex-col bg-[--bg-surface] border border-[--border-subtle] rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[--bg-elevated] animate-pulse" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-[--bg-elevated] animate-pulse rounded-md" />
            <div className="h-3 w-20 bg-[--bg-elevated] animate-pulse rounded-md" />
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-[--bg-elevated] animate-pulse" />
      </div>

      <div className="flex flex-col gap-2 mb-4 flex-grow">
        <div className="h-3 w-full bg-[--bg-elevated] animate-pulse rounded-md" />
        <div className="h-3 w-4/5 bg-[--bg-elevated] animate-pulse rounded-md" />
      </div>

      <div className="flex flex-col gap-2 mt-auto mb-4">
        <div className="h-3 w-2/3 bg-[--bg-elevated] animate-pulse rounded-md" />
        <div className="h-3 w-1/2 bg-[--bg-elevated] animate-pulse rounded-md" />
      </div>

      <div className="border-t border-[--border-subtle] pt-4 mt-auto">
        <div className="grid grid-cols-3 gap-2 text-center divide-x divide-[--border-subtle]">
          <div className="flex flex-col items-center gap-1">
            <div className="h-4 w-10 bg-[--bg-elevated] animate-pulse rounded-md" />
            <div className="h-2 w-12 bg-[--bg-elevated] animate-pulse rounded-md mt-1" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-4 w-10 bg-[--bg-elevated] animate-pulse rounded-md" />
            <div className="h-2 w-12 bg-[--bg-elevated] animate-pulse rounded-md mt-1" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-4 w-10 bg-[--bg-elevated] animate-pulse rounded-md" />
            <div className="h-2 w-12 bg-[--bg-elevated] animate-pulse rounded-md mt-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
