import { useParams, Link } from 'react-router-dom';
import { genres } from '../data/cast';
import { movies } from '../data/movies';
import { series } from '../data/series';
import MovieGrid from '../components/MovieGrid';
import './GenrePage.css';

export default function GenrePage() {
  const { slug } = useParams();
  const genre = genres.find(g => g.id === slug);
  const genreName = genre?.name || slug;

  const matchedMovies = movies.filter(m => m.genres.some(g => g.toLowerCase() === genreName.toLowerCase()));
  const matchedSeries = series.filter(s => s.genres.some(g => g.toLowerCase() === genreName.toLowerCase()));
  const all = [...matchedMovies, ...matchedSeries.map(s => ({ ...s, isSeries: true }))];

  return (
    <div className="page-wrapper">
      <div className="container">
        {genre && (
          <div className="genre-page-hero" style={{ background: `linear-gradient(135deg, ${genre.color}22, transparent)`, borderColor: `${genre.color}33` }}>
            <span className="genre-page-icon">{genre.icon}</span>
            <div>
              <h1>{genre.name}</h1>
              <p>{all.length} titles available</p>
            </div>
          </div>
        )}
        {!genre && (
          <div className="page-header">
            <h1 style={{ textTransform: 'capitalize' }}>{slug}</h1>
            <p>{all.length} titles found</p>
          </div>
        )}
        {all.length > 0 ? (
          <MovieGrid movies={all} />
        ) : (
          <div className="empty-state">
            <p>🎬 No titles found</p>
            <span>No movies or series found for this genre.</span>
            <Link to="/genres" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>All Genres</Link>
          </div>
        )}
      </div>
    </div>
  );
}
