import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import MovieCarousel from '../components/MovieCarousel';
import MovieGrid from '../components/MovieGrid';
import GenreCard from '../components/GenreCard';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import { genres } from '../data/cast';
import { useWatchlist } from '../context/WatchlistContext';
import { Clock } from 'lucide-react';
import './Home.css';

export default function Home() {
  const { continueWatching } = useWatchlist();
  const trending = movies.filter(m => m.trending);
  const popular = movies.filter(m => m.popular).slice(0, 12);
  const newReleases = [...movies].sort((a, b) => b.year - a.year).slice(0, 10);
  const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 12);
  const recommended = movies.filter(m => m.rating >= 8).slice(0, 10);

  return (
    <div>
      <HeroBanner movies={movies} />

      <div className="container">
        {continueWatching.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title"><Clock size={20} /> Continue Watching</h2>
            </div>
            <div className="carousel-track">
              {continueWatching.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          </section>
        )}

        <section className="section">
          <MovieCarousel title="🔥 Trending Now" movies={trending} viewAllLink="/trending" />
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Popular Movies</h2>
            <Link to="/movies" className="view-all">View All →</Link>
          </div>
          <MovieGrid movies={popular} />
        </section>

        <section className="section">
          <MovieCarousel title="🆕 New Releases" movies={newReleases} viewAllLink="/movies" />
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">🏆 Top Rated</h2>
            <Link to="/movies" className="view-all">View All →</Link>
          </div>
          <MovieGrid movies={topRated} />
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Browse by Genre</h2>
            <Link to="/genres" className="view-all">All Genres →</Link>
          </div>
          <div className="genres-grid">
            {genres.map(g => <GenreCard key={g.id} genre={g} />)}
          </div>
        </section>

        <section className="section">
          <MovieCarousel title="⭐ Recommended For You" movies={recommended} viewAllLink="/movies" />
        </section>
      </div>
    </div>
  );
}
