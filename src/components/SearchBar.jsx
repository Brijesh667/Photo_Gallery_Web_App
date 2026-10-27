import { memo } from 'react'

function SearchBar({ value, onChange }) {
  return (
    <div className="max-w-md mx-auto">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by author"
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default memo(SearchBar)
