import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, ChevronRight } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import MovieCarousel from '../components/MovieCarousel';
import { movies } from '../data/movies';
import { useWatchlist } from '../context/WatchlistContext';
import { useEffect } from 'react';
import './Watch.css';

export default function Watch() {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));
  const { addToContinueWatching } = useWatchlist();

  useEffect(() => {
    if (movie) addToContinueWatching(movie);
  }, [movie?.id]);

  if (!movie) return (
    <div className="page-wrapper container" style={{ paddingTop: 120, textAlign: 'center' }}>
      <h2>Movie not found</h2>
      <Link to="/movies" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Browse Movies</Link>
    </div>
  );

  const related = movies.filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))).slice(0, 10);
  const next = related[0];

  return (
    <div className="watch-page page-wrapper">
      <div className="container">
        <div className="watch-breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/movies">Movies</Link>
          <ChevronRight size={14} />
          <span>{movie.title}</span>
        </div>

        <div className="watch-layout">
          <div className="watch-main">
            <VideoPlayer src={movie.videoUrl} title={movie.title} />
            <div className="watch-info">
              <div className="watch-badges">
                <span className="badge badge-rating"><Star size={12} fill="#fbbf24" />{movie.rating}</span>
                {movie.genres?.map(g => <span key={g} className="badge badge-genre">{g}</span>)}
              </div>
              <h1 className="watch-title">{movie.title}</h1>
              <div className="watch-meta">
                <span><Calendar size={14} />{movie.year}</span>
                <span><Clock size={14} />{movie.runtime}</span>
                <span>{movie.language}</span>
                <span>Dir: {movie.director}</span>
              </div>
              <p className="watch-desc">{movie.description}</p>
            </div>

            {related.length > 0 && (
              <div className="watch-related">
                <MovieCarousel title="Related Movies" movies={related} />
              </div>
            )}
          </div>

          {next && (
            <div className="watch-sidebar">
              <h3 className="sidebar-title">Up Next</h3>
              <Link to={`/watch/${next.id}`} className="next-card">
                <img src={next.poster} alt={next.title} />
                <div>
                  <p className="next-title">{next.title}</p>
                  <p className="next-meta">{next.year} · {next.runtime}</p>
                  <p className="next-rating"><Star size={11} fill="#fbbf24" color="#fbbf24" /> {next.rating}</p>
                </div>
              </Link>
              <h3 className="sidebar-title" style={{ marginTop: 24 }}>More Like This</h3>
              {related.slice(1, 6).map(m => (
                <Link key={m.id} to={`/watch/${m.id}`} className="next-card">
                  <img src={m.poster} alt={m.title} />
                  <div>
                    <p className="next-title">{m.title}</p>
                    <p className="next-meta">{m.year} · {m.runtime}</p>
                    <p className="next-rating"><Star size={11} fill="#fbbf24" color="#fbbf24" /> {m.rating}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
