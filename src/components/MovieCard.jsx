import { Link } from 'react-router-dom';
import { Star, Play, Bookmark, BookmarkCheck } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import './MovieCard.css';

export default function MovieCard({ movie, type = 'movie' }) {
  const { addToWatchlist, isInWatchlist } = useWatchlist();
  const inList = isInWatchlist(movie.id);
  const detailPath = type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`;
  const watchPath = type === 'series' ? `/series/${movie.id}` : `/watch/${movie.id}`;

  return (
    <div className="movie-card">
      <div className="card-poster">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop'; }}
        />
        <div className="card-overlay">
          <Link to={watchPath} className="card-play-btn" aria-label="Play">
            <Play size={22} fill="white" />
          </Link>
          <button
            className={`card-watchlist-btn ${inList ? 'active' : ''}`}
            onClick={e => { e.preventDefault(); addToWatchlist(movie); }}
            aria-label="Watchlist"
          >
            {inList ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>
        <div className="card-rating">
          <Star size={11} fill="#fbbf24" color="#fbbf24" />
          {movie.rating}
        </div>
        {movie.genres?.[0] && <div className="card-genre-tag">{movie.genres[0]}</div>}
      </div>
      <div className="card-info">
        <Link to={detailPath} className="card-title">{movie.title}</Link>
        <div className="card-meta">
          <span>{movie.year}</span>
          {movie.runtime && <span>{movie.runtime}</span>}
          {movie.seasons && <span>{movie.seasons}S</span>}
        </div>
      </div>
    </div>
  );
}
