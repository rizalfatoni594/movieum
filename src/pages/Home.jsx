import '../css/Home.css';
import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard.jsx';
import { getPopularMovies, searchMovies } from '../services/api.js';

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
        setError('Failed to load movies...');
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
    } catch (error) {
      console.log(error);
      setError('Failed to search movies...');
    } finally {
      setLoading(false);
    }

    // setSearchQuery('');
  }

  return (
    <div className='home'>
      <form onSubmit={handleSearch} className='search-form'>
        <input
          type='text'
          placeholder='Search for movies...'
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type='submit' className='search-button'>
          Search
        </button>
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
