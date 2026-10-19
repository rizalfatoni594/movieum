import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from '../services/api.js';
import MovieCard from '../components/MovieCard.jsx';
import '../css/Home.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPopularMovies() {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.log(error);
        setError('Failed to load popular movies...');
      } finally {
        setLoading(false);
      }
    }

    loadPopularMovies();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
      setSearchQuery('');
    } catch (error) {
      console.log(error);
      setError('Failed to load searched movies...');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='home'>
      <form className='search-form' onSubmit={handleSearch}>
        <input
          type='text'
          placeholder='Search for movies...'
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className='search-button'>Search</button>
      </form>

      {error && <div className='error-message'>{error}</div>}

      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <div className='movies-grid'>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
