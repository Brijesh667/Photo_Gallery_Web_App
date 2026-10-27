import useFetchPhotos from '../hooks/useFetchPhotos'
import PhotoCard from './PhotoCard'
import Spinner from './Spinner'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourite={false}
          onToggle={() => {}}
        />
      ))}
    </div>
  )
}

export default Gallery
