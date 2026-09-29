import { Link } from 'react-router-dom';
import { Bookmark, Trash2 } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import MovieGrid from '../components/MovieGrid';
import './Watchlist.css';

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1><Bookmark size={28} /> My Watchlist</h1>
          <p>{watchlist.length} saved {watchlist.length === 1 ? 'movie' : 'movies'}</p>
        </div>

        {watchlist.length === 0 ? (
          <div className="watchlist-empty">
            <Bookmark size={64} />
            <h2>Your watchlist is empty.</h2>
            <p>Save movies here to watch them later.</p>
            <Link to="/movies" className="btn btn-primary" style={{ marginTop: 20 }}>Browse Movies</Link>
          </div>
        ) : (
          <MovieGrid movies={watchlist} />
        )}
      </div>
    </div>
  );
}
