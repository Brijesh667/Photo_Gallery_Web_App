import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center tracking-tight">
            Photo Gallery
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-8">
        <Gallery />
      </main>
    </div>
  )
}

export default App
