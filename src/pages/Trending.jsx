import MovieCarousel from '../components/MovieCarousel';
import MovieGrid from '../components/MovieGrid';
import { movies } from '../data/movies';
import { series } from '../data/series';
import { TrendingUp } from 'lucide-react';
import './Trending.css';

export default function Trending() {
  const todayTrending = movies.filter(m => m.trending).slice(0, 10);
  const weekTrending = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 12);
  const popularMovies = movies.filter(m => m.popular).slice(0, 12);
  const popularSeries = series.filter(s => s.popular).slice(0, 8);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1><TrendingUp size={28} /> Trending</h1>
          <p>What everyone is watching right now</p>
        </div>

        <section className="section">
          <MovieCarousel title="🔥 Trending Today" movies={todayTrending} />
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">📅 This Week</h2>
          </div>
          <MovieGrid movies={weekTrending} />
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">🎬 Popular Movies</h2>
          </div>
          <MovieGrid movies={popularMovies} />
        </section>

        <section className="section">
          <MovieCarousel title="📺 Popular TV Series" movies={popularSeries} type="series" />
        </section>
      </div>
    </div>
  );
}
