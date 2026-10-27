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

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
        {error}
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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

      {filteredPhotos.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No photos found</p>
      ) : (
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
    </div>
  )
}

export default Gallery
