import { createContext, useContext, useState, useEffect } from 'react'

const FavouritesContext = createContext()

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem('gh_favourites')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Failed to parse favourites from localStorage')
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('gh_favourites', JSON.stringify(favourites))
  }, [favourites])

  const addFavourite = (user) => {
    setFavourites((prev) => {
      if (prev.some((f) => f.login === user.login)) return prev
      if (prev.length >= 50) {
        alert('Maximum of 50 favourites allowed.') // Or toast
        return prev
      }
      return [...prev, user]
    })
  }

  const removeFavourite = (username) => {
    setFavourites((prev) => prev.filter((f) => f.login !== username))
  }

  const isFavourite = (username) => {
    return favourites.some((f) => f.login === username)
  }

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  const context = useContext(FavouritesContext)
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider')
  }
  return context
}
