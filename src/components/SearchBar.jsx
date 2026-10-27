import { memo } from 'react'

function SearchBar({ value, onChange }) {
  return (
    <div className="group relative max-w-md mx-auto">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by author"
        className="w-full pl-10 pr-4 py-2 bg-slate-900/70 backdrop-blur border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl transition-all duration-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:shadow-[0_0_25px_rgba(168,85,247,0.45)]"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-pink-400 z-10 transition-colors pointer-events-none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  )
}

export default memo(SearchBar)
