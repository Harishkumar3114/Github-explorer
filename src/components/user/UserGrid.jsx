import { UserCard } from './UserCard'
import { UserCardSkeleton } from './UserCardSkeleton'
import { useFavourites } from '../../context/FavouritesContext'

export function UserGrid({ users, loading, skeletonCount = 8 }) {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites()

  const handleToggleFavourite = (user) => {
    if (isFavourite(user.login)) {
      removeFavourite(user.login)
    } else {
      addFavourite(user)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <UserCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!users || users.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
      {users.map((user) => (
        <UserCard 
          key={user.login || user.id} 
          user={user} 
          isFavourite={isFavourite(user.login)}
          onToggleFavourite={handleToggleFavourite}
        />
      ))}
    </div>
  )
}
