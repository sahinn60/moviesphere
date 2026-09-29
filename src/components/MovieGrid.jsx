import MovieCard from './MovieCard';
import './MovieGrid.css';

export default function MovieGrid({ movies, type = 'movie' }) {
  if (!movies.length) {
    return (
      <div className="empty-state">
        <p>🎬 No movies found</p>
        <span>Try another title or genre.</span>
      </div>
    );
  }
  return (
    <div className="movie-grid">
      {movies.map(m => <MovieCard key={m.id} movie={m} type={type} />)}
    </div>
  );
}
