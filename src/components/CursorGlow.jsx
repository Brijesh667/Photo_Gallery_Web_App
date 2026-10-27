import { useEffect, useRef } from 'react'

function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    function handleMouseMove(e) {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 192}px, ${e.clientY - 192}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.25),transparent_70%)] blur-2xl transition-transform duration-150 ease-out pointer-coarse:hidden motion-reduce:hidden"
    />
  )
}

export default CursorGlow
