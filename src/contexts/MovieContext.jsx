import { createContext, useContext, useEffect, useState } from 'react';

// 1. Create the movie context object to contain the later shared context values (eg: state or function)
const MovieContext = createContext();

// 2. Custom hook to consume the movie context in other components
export function useMovieContext() {
  const context = useContext(MovieContext);
  return context;
}

// 3. Provider component that wraps your app/components (so that they can have access to the context values)
export default function MovieProvider({ children }) {
  // 3a. Initialize state by loading saved favorites from localStorage (with safety checks)
  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem('favorites');

    // 3a.1 Check if real favorites with actual list exists and isn't the literal string "undefined" (browser quirks)
    if (!storedFavs || storedFavs === 'undefined') return [];

    // 3a.2 Parse and use it as this state's default value
    try {
      return JSON.parse(storedFavs);
    } catch (error) {
      console.log('Failed to parse favorites from localStorage:', error);
      return [];
    }
  });

  // 3b. Automatically save favorites to localStorage whenever the list updates
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 3c. Helper: Add a movie to the favorites list
  function addToFavorites(movie) {
    setFavorites((prev) => [...prev, movie]);
  }

  // 3d. Helper: Remove a movie by filtering it out using its ID
  function removeFromFavorites(movieId) {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  }

  // 3e. Helper: Check if a specific movie is currently favorited (returns true/false)
  function isFavorite(movieId) {
    return favorites.some((movie) => movie.id === movieId);
  }

  // 3f. Bundle state and helper functions into one object to share
  const value = { favorites, addToFavorites, removeFromFavorites, isFavorite };

  // 3g. Render the provider, passing the bundle down to all child components
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}
