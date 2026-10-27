import useFetchPhotos from '../hooks/useFetchPhotos'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()

  if (loading) {
    return <p className="text-gray-500">Loading...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <p className="text-gray-700">Photos loaded: {photos.length}</p>
  )
}

export default Gallery
