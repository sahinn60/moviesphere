import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, Globe, MapPin, Play, Bookmark, BookmarkCheck, Share2, ChevronRight } from 'lucide-react';
import { movies } from '../data/movies';
import { castMembers } from '../data/cast';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCarousel from '../components/MovieCarousel';
import './MovieDetail.css';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(id));
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  if (!movie) return (
    <div className="page-wrapper container" style={{ paddingTop: 120, textAlign: 'center' }}>
      <h2>Movie not found</h2>
      <Link to="/movies" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Browse Movies</Link>
    </div>
  );

  const cast = movie.cast?.map(cid => castMembers.find(c => c.id === cid)).filter(Boolean) || [];
  const similar = movies.filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))).slice(0, 10);
  const inList = isInWatchlist(movie.id);

  const share = () => {
    if (navigator.share) navigator.share({ title: movie.title, url: window.location.href });
    else navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="detail-page">
      <div className="detail-backdrop">
        <img src={movie.backdrop} alt={movie.title} />
        <div className="detail-backdrop-gradient" />
      </div>

      <div className="container detail-content">
        <div className="detail-main">
          <div className="detail-poster">
            <img src={movie.poster} alt={movie.title} />
          </div>
          <div className="detail-info">
            <div className="detail-badges">
              <span className="badge badge-rating"><Star size={13} fill="#fbbf24" />{movie.rating}</span>
              {movie.genres?.map(g => <span key={g} className="badge badge-genre">{g}</span>)}
            </div>
            <h1 className="detail-title">{movie.title}</h1>
            <div className="detail-meta">
              <span><Calendar size={14} />{movie.year}</span>
              <span><Clock size={14} />{movie.runtime}</span>
              <span><Globe size={14} />{movie.language}</span>
              <span><MapPin size={14} />{movie.country}</span>
            </div>
            <p className="detail-desc">{movie.description}</p>
            <div className="detail-crew">
              <span><strong>Director:</strong> {movie.director}</span>
            </div>
            <div className="detail-actions">
              <Link to={`/watch/${movie.id}`} className="btn btn-primary">
                <Play size={18} fill="white" /> Watch Now
              </Link>
              <a href={movie.trailer} target="_blank" rel="noreferrer" className="btn btn-secondary">▶ Trailer</a>
              <button className={`btn btn-outline ${inList ? 'watchlist-active' : ''}`} onClick={() => addToWatchlist(movie)}>
                {inList ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                {inList ? 'Saved' : 'Watchlist'}
              </button>
              <button className="btn btn-outline" onClick={share}><Share2 size={16} /> Share</button>
            </div>
          </div>
        </div>

        {cast.length > 0 && (
          <section className="detail-section">
            <h2 className="section-title">Cast</h2>
            <div className="cast-grid">
              {cast.map(c => (
                <div key={c.id} className="cast-card">
                  <img src={c.photo} alt={c.name} loading="lazy" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'; }} />
                  <div>
                    <p className="cast-name">{c.name}</p>
                    <p className="cast-role">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="detail-section">
            <MovieCarousel title="Similar Movies" movies={similar} />
          </section>
        )}
      </div>
    </div>
  );
}
