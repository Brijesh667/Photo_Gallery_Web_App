# Photo Gallery Web App

A responsive photo gallery application built with React, Vite, and Tailwind CSS.

## Tech Stack
- React
- Vite
- Tailwind CSS

## Features
- Fetches photos from Picsum API (`https://picsum.photos/v2/list?limit=30`)
- Loading spinner and error handling state
- Responsive grid (1 column on mobile, 2 on tablet, 4 on desktop)
- Real-time search filter by author name
- Favourites management persisted in localStorage
- Favourites counter and toggle filter to view only favourited photos

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Hooks Used
- `useFetchPhotos`: Custom hook to fetch photo data on component mount and manage loading/error states.
- `useReducer`: Manages the list of favourite photo IDs with pure state transitions.
- `useCallback`: Memoizes the search input handler passed to the memoized SearchBar.
- `useMemo`: Computes filtered photos in memory based on search query and favourites filter.
