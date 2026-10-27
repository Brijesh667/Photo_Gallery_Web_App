import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 text-center tracking-tight mb-4">
        Photo Gallery
      </h1>
      <Gallery />
    </div>
  )
}

export default App
