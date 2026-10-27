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
              <div className="flex items-center justify-center md:justify-end gap-3 flex-wrap">
                <span className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-full px-3 py-1 text-sm text-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-pink-500">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                  Favourites: {favourites.length}
                </span>
                <button
                  type="button"
                  onClick={() => setShowFavourites((prev) => !prev)}
                  aria-pressed={showFavourites}
                  className={`group relative overflow-hidden rounded-xl px-4 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-sm ${
                    showFavourites
                      ? 'bg-linear-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]'
                      : 'bg-slate-800 border border-slate-700 text-slate-200 hover:border-purple-500'
                  }`}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">{showFavourites ? 'Show all' : 'Show favourites'}</span>
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
            {filteredPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
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
