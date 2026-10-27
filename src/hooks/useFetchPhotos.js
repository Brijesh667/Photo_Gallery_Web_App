import { useState, useEffect } from 'react'

function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadPhotos() {
      try {
        const res = await fetch('https://picsum.photos/v2/list?limit=30')
        if (!res.ok) {
          throw new Error('Failed to fetch')
        }
        const data = await res.json()
        if (isMounted) {
          setPhotos(data)
        }
      } catch {
        if (isMounted) {
          setError('Failed to load photos')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadPhotos()

    return () => {
      isMounted = false
    }
  }, [])

  return { photos, loading, error }
}

export default useFetchPhotos
