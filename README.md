# Photo Gallery Web App

A responsive photo gallery built with React, Vite and Tailwind CSS. It fetches photos from the Picsum API, lets you search by author name, and lets you mark photos as favourites that stay saved after a page refresh.

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4

No UI component libraries, no icon libraries. Icons are inline SVGs.

## Features

- Fetches 30 photos from `https://picsum.photos/v2/list?limit=30` on load
- Loading spinner while fetching, error message if the request fails
- Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop
- Each card shows the photo, the author name and a heart button
- Real-time search by author name (filters the already fetched data, no extra API call)
- Favourites toggle with the heart button, saved in localStorage
- Favourites counter and a "Show favourites" button to view only favourited photos
- Dark theme with hover effects: animated RGB border on cards, image zoom, cursor glow, animated search input and buttons

## Getting Started

1. Clone the repository

   ```bash
   git clone <your-repo-link>
   cd <project-folder>
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the dev server

   ```bash
   npm run dev
   ```

4. Open the local URL shown in the terminal (usually `http://localhost:5173`)

To create a production build:

```bash
npm run build
```

## Project Structure

```
src/
  components/
    Gallery.jsx       main component, connects the hook, reducer and search
    PhotoCard.jsx     single photo card with the heart button
    SearchBar.jsx     search input (wrapped in React.memo)
    Spinner.jsx       loading spinner
    CursorGlow.jsx    glow that follows the mouse
  hooks/
    useFetchPhotos.js custom hook for fetching photos
  reducers/
    favouritesReducer.js  reducer and localStorage initial state
  App.jsx
  main.jsx
  index.css
```

## How It Works

### useFetchPhotos (custom hook)
Fetches the photos once when the component mounts and returns `photos`, `loading` and `error`. If the response is not ok or the request fails, `error` is set and the Gallery shows an error message. A cleanup flag stops state updates if the component unmounts before the request finishes. The Gallery component uses this hook and never fetches data directly.

### useReducer (favourites)
Favourites are stored as an array of photo ids and managed with `useReducer`. The reducer handles one action, `TOGGLE_FAVOURITE`: if the id is already in the list it is removed, otherwise it is added. The state is never mutated directly. The initial state is read from localStorage using a lazy initializer, and a `useEffect` saves the list back to localStorage whenever it changes. If the saved value is corrupt, the app falls back to an empty list.

### useMemo (filtered list)
The filtered photo list is computed with `useMemo`. It only runs again when the photos, the search text, the favourites filter or the favourites list change, not on every render.

### useCallback (search handler)
The search input handler is wrapped in `useCallback` so its reference stays the same between renders. Since `SearchBar` is wrapped in `React.memo`, it does not re-render when only the favourites change.

