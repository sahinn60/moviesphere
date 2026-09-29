import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Calendar } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import MovieCarousel from '../components/MovieCarousel';
import { series } from '../data/series';
import './Series.css';

export default function Series() {
  const featured = series.filter(s => s.featured);
  const trending = series.filter(s => s.trending);
  const popular = series.filter(s => s.popular);
  const newSeries = [...series].sort((a, b) => b.year - a.year).slice(0, 8);

  const heroMovies = featured.map(s => ({ ...s, runtime: `${s.seasons} Season${s.seasons > 1 ? 's' : ''}`, videoUrl: s.episodes?.[0]?.videoUrl }));

  return (
    <div>
      <HeroBanner movies={heroMovies} />
      <div className="container">
        <section className="section">
          <MovieCarousel title="🔥 Trending Series" movies={trending} type="series" />
        </section>
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Popular Series</h2>
          </div>
          <div className="series-grid">
            {popular.map(s => (
              <Link key={s.id} to={`/series/${s.id}`} className="series-card">
                <div className="series-card-poster">
                  <img src={s.poster} alt={s.title} loading="lazy" />
                  <div className="series-card-overlay">
                    <Play size={28} fill="white" />
                  </div>
                  <div className="series-card-rating">
                    <Star size={11} fill="#fbbf24" color="#fbbf24" /> {s.rating}
                  </div>
                </div>
                <div className="series-card-info">
                  <p className="series-card-title">{s.title}</p>
                  <p className="series-card-meta">{s.year} · {s.seasons}S · {s.genres[0]}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="section">
          <MovieCarousel title="🆕 New Series" movies={newSeries} type="series" />
        </section>
      </div>
    </div>
  );
}
