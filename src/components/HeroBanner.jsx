import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Info, Bookmark, BookmarkCheck, Star, Clock, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import './HeroBanner.css';

export default function HeroBanner({ movies }) {
  const [current, setCurrent] = useState(0);
  const { addToWatchlist, isInWatchlist } = useWatchlist();
  const navigate = useNavigate();
  const featured = movies.filter(m => m.featured);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % featured.length), 7000);
    return () => clearInterval(t);
  }, [featured.length]);

  if (!featured.length) return null;
  const movie = featured[current];
  const inList = isInWatchlist(movie.id);

  return (
    <div className="hero">
      <div className="hero-bg">
        <img src={movie.backdrop} alt={movie.title} key={movie.id} className="hero-img fade-in" />
        <div className="hero-gradient" />
      </div>

      <div className="hero-content container">
        <div className="hero-badges">
          <span className="badge badge-rating"><Star size={12} fill="#fbbf24" />{movie.rating}</span>
          {movie.genres?.map(g => <span key={g} className="badge badge-genre">{g}</span>)}
        </div>
        <h1 className="hero-title">{movie.title}</h1>
        <div className="hero-meta">
          <span><Calendar size={14} />{movie.year}</span>
          <span><Clock size={14} />{movie.runtime}</span>
          <span>{movie.language}</span>
          <span>{movie.country}</span>
        </div>
        <p className="hero-desc">{movie.description}</p>
        <div className="hero-actions">
          <Link to={`/watch/${movie.id}`} className="btn btn-primary">
            <Play size={18} fill="white" /> Watch Now
          </Link>
          <a href={movie.trailer} target="_blank" rel="noreferrer" className="btn btn-secondary">
            ▶ Trailer
          </a>
          <Link to={`/movie/${movie.id}`} className="btn btn-outline">
            <Info size={16} /> More Info
          </Link>
          <button className={`btn btn-outline ${inList ? 'watchlist-active' : ''}`} onClick={() => addToWatchlist(movie)}>
            {inList ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {inList ? 'Saved' : 'Watchlist'}
          </button>
        </div>
      </div>

      <div className="hero-nav">
        <button onClick={() => setCurrent(c => (c - 1 + featured.length) % featured.length)} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <div className="hero-dots">
          {featured.map((_, i) => (
            <button key={i} className={`dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
          ))}
        </div>
        <button onClick={() => setCurrent(c => (c + 1) % featured.length)} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
