import MovieCard from '../components/MovieCard.jsx';
import '../css/Favorites.css';
import { useMovieContext } from '../contexts/MovieContext.jsx';

export default function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className='favorites'>
        <h2>Your Favorites</h2>
        <div className='movies-grid'>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='favorites-empty'>
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}
