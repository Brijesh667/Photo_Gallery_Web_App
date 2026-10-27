import { useState, useCallback, useMemo } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import PhotoCard from './PhotoCard'
import Spinner from './Spinner'
import SearchBar from './SearchBar'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query.trim().toLowerCase())
    )
  }, [photos, query])

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
      <div className="mb-8">
        <SearchBar value={query} onChange={handleSearch} />
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No photos found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={false}
              onToggle={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery
