import { SearchX, BookOpen, Heart } from 'lucide-react'

const icons = {
  SearchX,
  BookOpen,
  Heart
}

export function EmptyState({ icon, heading, description, ctaLabel, ctaHref }) {
  const IconComponent = icons[icon] || SearchX

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-fadeIn border border-dashed border-[--border-subtle] rounded-xl bg-[--bg-surface]">
      <div className="w-12 h-12 rounded-full bg-[--bg-elevated] flex items-center justify-center mb-4">
        <IconComponent className="w-6 h-6 text-[--text-muted]" />
      </div>
      <h3 className="text-base font-semibold text-[--text-primary] mb-1">{heading}</h3>
      <p className="text-sm text-[--text-secondary] max-w-sm mb-6">
        {description}
      </p>
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="text-sm text-[--accent] hover:text-[--accent-hover] font-medium transition-colors"
        >
          {ctaLabel}
        </a>
      )}
    </div>
  )
}
