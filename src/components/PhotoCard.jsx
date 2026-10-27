function PhotoCard({ photo, index = 0, isFavourite, onToggle }) {
  return (
    <div
      className="group relative rounded-xl p-0.5 overflow-hidden animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]"
      style={{ animationDelay: `${(index % 8) * 60}ms` }}
    >
      <span className="absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[spin_3s_linear_infinite] motion-reduce:animate-none bg-[conic-gradient(from_0deg,#ff0080,#ff8c00,#40e0d0,#7928ca,#ff0080)]" />
      <div className="relative bg-slate-900 rounded-[10px] overflow-hidden flex flex-col h-full">
        <div className="overflow-hidden">
          <img
            src={`https://picsum.photos/id/${photo.id}/400/300`}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4 flex items-center justify-between gap-2 mt-auto">
          <span className="text-sm font-medium text-slate-200 truncate" title={photo.author}>
            {photo.author}
          </span>
          <button
            type="button"
            onClick={onToggle}
            aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
            className="cursor-pointer p-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 active:scale-90 transition-transform"
          >
            {isFavourite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-pink-500 animate-pop"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-slate-500 hover:text-pink-500 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard
