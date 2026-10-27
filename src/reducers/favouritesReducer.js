export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      if (state.includes(action.id)) {
        return state.filter((id) => id !== action.id)
      }
      return [...state, action.id]
    default:
      return state
  }
}

export function getInitialFavourites() {
  try {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  } catch (err) {
    return []
  }
}
