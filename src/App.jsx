import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { FavouritesPage } from './pages/FavouritesPage'
import { FavouritesProvider } from './context/FavouritesContext'
import { SearchProvider } from './context/SearchContext'
import { RateLimitBanner } from './components/ui/RateLimitBanner'

function App() {
  const [rateLimitError, setRateLimitError] = useState(null)

  return (
    <FavouritesProvider>
      <SearchProvider>
        <Router>
          <div className="min-h-screen flex flex-col w-full bg-[--bg-base]">
            <Navbar />
            <RateLimitBanner 
              resetTime={rateLimitError?.resetTime} 
              onDismiss={() => setRateLimitError(null)} 
            />
            <main className="flex-grow w-full flex flex-col">
              <Routes>
                <Route path="/" element={<HomePage setRateLimitError={setRateLimitError} />} />
                <Route path="/user/:username" element={<ProfilePage setRateLimitError={setRateLimitError} />} />
                <Route path="/favourites" element={<FavouritesPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </SearchProvider>
    </FavouritesProvider>
  )
}

export default App
