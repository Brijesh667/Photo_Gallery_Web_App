import Gallery from './components/Gallery'
import CursorGlow from './components/CursorGlow'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <CursorGlow />
      <div className="relative z-10">
        <Gallery />
      </div>
    </div>
  )
}

export default App
