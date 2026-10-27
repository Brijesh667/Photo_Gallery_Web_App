import { useState, useCallback, useMemo, useReducer, useEffect } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import { favouritesReducer, getInitialFavourites } from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'
import Spinner from './Spinner'
import SearchBar from './SearchBar'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [favourites, dispatch] = useReducer(favouritesReducer, [], getInitialFavourites)
  const [query, setQuery] = useState('')
  const [showFavourites, setShowFavourites] = useState(false)

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesAuthor = photo.author
        .toLowerCase()
        .includes(query.trim().toLowerCase())
      const matchesFavourite = !showFavourites || favourites.includes(photo.id)
      return matchesAuthor && matchesFavourite
    })
  }, [photos, query, showFavourites, favourites])

  return (
    <div>
      <header className="sticky top-0 z-20 bg-slate-950/70 backdrop-blur-md border-b border-white/10 py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight mb-4">
            Photo Gallery
          </h1>
          {!loading && !error && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="w-full md:w-auto flex-1 max-w-md">
                <SearchBar value={query} onChange={handleSearch} />
              </div>
              <div className="flex items-center justify-center md:justify-end gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Favourites: {favourites.length}
                </span>
                <button
                  type="button"
                  onClick={() => setShowFavourites((prev) => !prev)}
                  aria-pressed={showFavourites}
                  className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                    showFavourites
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {showFavourites ? 'Show all' : 'Show favourites'}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-8">
        {loading && <Spinner />}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="text-center text-slate-400 py-12">No photos found</p>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggle={() => dispatch({ type: 'TOGGLE_FAVOURITE', id: photo.id })}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Gallery
