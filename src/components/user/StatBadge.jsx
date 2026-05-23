import { formatNumber } from '../../lib/utils'

export function StatBadge({ icon: Icon, value, label }) {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[--bg-base] border border-[--border-subtle]">
      {Icon && <Icon className="w-4 h-4 text-[--text-secondary] mb-1" />}
      <span className="font-mono text-sm font-medium text-[--text-primary]">
        {typeof value === 'number' ? formatNumber(value) : value}
      </span>
      <span className="text-xs text-[--text-muted] uppercase tracking-wider mt-0.5">
        {label}
      </span>
    </div>
  )
}
