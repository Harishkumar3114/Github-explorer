import { PageWrapper } from '../components/layout/PageWrapper'
import { UserGrid } from '../components/user/UserGrid'
import { useFavourites } from '../context/FavouritesContext'
import { EmptyState } from '../components/ui/EmptyState'

export function FavouritesPage() {
  const { favourites } = useFavourites()

  return (
    <PageWrapper>
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-semibold text-[--text-primary] mb-1">
          Saved Developers <span className="text-[--text-muted] font-normal">({favourites.length})</span>
        </h1>
        <p className="text-sm text-[--text-secondary]">Your curated list of GitHub profiles</p>
      </div>

      <div className="animate-fadeIn">
        {favourites.length === 0 ? (
          <EmptyState 
            icon="Heart"
            heading="No favourites yet"
            description="You haven't saved any developers yet. Go explore and save your favourites!"
            ctaLabel="Discover developers →"
            ctaHref="/"
          />
        ) : (
          <UserGrid users={favourites} loading={false} />
        )}
      </div>
    </PageWrapper>
  )
}
