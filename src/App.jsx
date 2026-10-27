import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center tracking-tight mb-8">
          Photo Gallery
        </h1>
        <Gallery />
      </div>
    </div>
  )
}

export default App
