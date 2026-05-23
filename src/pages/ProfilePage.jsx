import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ProfileStats } from '../components/profile/ProfileStats'
import { RepoFilters } from '../components/profile/RepoFilters'
import { RepoGrid } from '../components/profile/RepoGrid'
import { useGithubUser } from '../hooks/useGithubUser'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { useFavourites } from '../context/FavouritesContext'
import { ErrorState } from '../components/ui/ErrorState'
import { UserCardSkeleton } from '../components/user/UserCardSkeleton'
import { RepoCardSkeleton } from '../components/profile/RepoCardSkeleton'

function ProfileSkeleton() {
  return (
    <div className="animate-fadeIn">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 mb-8">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[--bg-elevated] animate-pulse shrink-0" />
        <div className="flex-grow flex flex-col gap-4 w-full">
          <div className="h-8 w-48 bg-[--bg-elevated] animate-pulse rounded-md" />
          <div className="h-4 w-32 bg-[--bg-elevated] animate-pulse rounded-md" />
          <div className="h-16 w-full max-w-2xl bg-[--bg-elevated] animate-pulse rounded-md" />
        </div>
      </div>
      
      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-[--bg-elevated] animate-pulse rounded-xl border border-[--border-subtle]" />
        ))}
      </div>

      {/* Repos Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <RepoCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function ProfilePage({ setRateLimitError }) {
  const { username } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [username])
  
  const { user, loading: userLoading, error: userError } = useGithubUser(username, setRateLimitError)
  const { 
    filteredRepos, 
    totalStars, 
    languages, 
    loading: reposLoading, 
    error: reposError,
    filters,
    setSort,
    setLanguage
  } = useGithubRepos(username, setRateLimitError)

  const { isFavourite, addFavourite, removeFavourite } = useFavourites()

  const handleToggleFavourite = (u) => {
    if (isFavourite(u.login)) {
      removeFavourite(u.login)
    } else {
      addFavourite(u)
    }
  }

  const goBack = () => {
    navigate(-1)
  }

  if (userError?.isNotFound) {
    return (
      <PageWrapper>
        <button onClick={goBack} className="mb-6 flex items-center gap-2 text-sm text-[--text-muted] hover:text-[--text-primary] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <ErrorState message="This user doesn't exist on GitHub" />
      </PageWrapper>
    )
  }

  if (userError) {
    return (
      <PageWrapper>
        <button onClick={goBack} className="mb-6 flex items-center gap-2 text-sm text-[--text-muted] hover:text-[--text-primary] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <ErrorState message={userError.message} onRetry={() => window.location.reload()} />
      </PageWrapper>
    )
  }

  if (userLoading) {
    return (
      <PageWrapper>
        <button onClick={goBack} className="mb-6 flex items-center gap-2 text-sm text-[--text-muted] hover:text-[--text-primary] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <ProfileSkeleton />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <button 
        onClick={goBack} 
        className="mb-6 flex items-center gap-2 text-sm text-[--text-muted] hover:text-[--text-primary] transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <ProfileHeader 
        user={user} 
        isFavourite={isFavourite(user?.login)} 
        onToggleFavourite={handleToggleFavourite} 
      />

      <ProfileStats user={user} totalStars={totalStars} />

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[--text-primary]">
          Public Repositories <span className="text-[--text-muted] font-normal">({user?.public_repos || 0})</span>
        </h2>
      </div>

      <RepoFilters 
        sort={filters.sort}
        onSortChange={setSort}
        language={filters.language}
        onLanguageChange={setLanguage}
        languages={languages}
      />

      {reposError ? (
        <ErrorState message={reposError.message} />
      ) : (
        <RepoGrid repos={filteredRepos} loading={reposLoading} />
      )}
    </PageWrapper>
  )
}
