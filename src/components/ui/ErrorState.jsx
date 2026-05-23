import { AlertCircle } from 'lucide-react'

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
      <AlertCircle className="w-10 h-10 text-[--danger] mb-4" />
      <h3 className="text-lg font-semibold text-[--text-primary] mb-2">Something went wrong</h3>
      <p className="text-sm text-[--text-secondary] mb-6 max-w-md">
        {message || 'An unexpected error occurred while fetching data.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-[--accent] text-[#0d1117] font-semibold text-sm rounded-lg px-4 py-2 hover:bg-[--accent-hover] transition-colors duration-150 active:scale-95"
        >
          Try again
        </button>
      )}
    </div>
  )
}
