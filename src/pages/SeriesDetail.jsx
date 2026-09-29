import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Calendar, Play, Bookmark, BookmarkCheck, ChevronDown } from 'lucide-react';
import { series } from '../data/series';
import { useWatchlist } from '../context/WatchlistContext';
import './SeriesDetail.css';

export default function SeriesDetail() {
  const { id } = useParams();
  const show = series.find(s => s.id === parseInt(id));
  const [selectedSeason, setSelectedSeason] = useState(1);
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  if (!show) return (
    <div className="page-wrapper container" style={{ paddingTop: 120, textAlign: 'center' }}>
      <h2>Series not found</h2>
      <Link to="/series" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Browse Series</Link>
    </div>
  );

  const inList = isInWatchlist(show.id);
  const seasonEpisodes = show.episodes?.filter(e => e.season === selectedSeason) || [];
  const allSeasons = [...new Set(show.episodes?.map(e => e.season) || [1])];

  return (
    <div className="series-detail-page">
      <div className="detail-backdrop">
        <img src={show.backdrop} alt={show.title} />
        <div className="detail-backdrop-gradient" />
      </div>

      <div className="container detail-content">
        <div className="detail-main">
          <div className="detail-poster">
            <img src={show.poster} alt={show.title} />
          </div>
          <div className="detail-info">
            <div className="detail-badges">
              <span className="badge badge-rating"><Star size={13} fill="#fbbf24" />{show.rating}</span>
              <span className="badge badge-new">TV Series</span>
              {show.genres?.map(g => <span key={g} className="badge badge-genre">{g}</span>)}
            </div>
            <h1 className="detail-title">{show.title}</h1>
            <div className="detail-meta">
              <span><Calendar size={14} />{show.year}</span>
              <span>{show.seasons} Season{show.seasons > 1 ? 's' : ''}</span>
              <span>{show.language}</span>
              <span>{show.country}</span>
            </div>
            <p className="detail-desc">{show.description}</p>
            <div className="detail-actions">
              {show.episodes?.[0] && (
                <Link to={`/watch-episode/${show.id}/${show.episodes[0].id}`} className="btn btn-primary">
                  <Play size={18} fill="white" /> Watch Now
                </Link>
              )}
              <button className={`btn btn-outline ${inList ? 'watchlist-active' : ''}`} onClick={() => addToWatchlist(show)}>
                {inList ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                {inList ? 'Saved' : 'Watchlist'}
              </button>
            </div>
          </div>
        </div>

        <section className="episodes-section">
          <div className="episodes-header">
            <h2 className="section-title">Episodes</h2>
            <div className="season-selector">
              {allSeasons.map(s => (
                <button key={s} className={`season-btn ${selectedSeason === s ? 'active' : ''}`} onClick={() => setSelectedSeason(s)}>
                  Season {s}
                </button>
              ))}
            </div>
          </div>
          <div className="episodes-list">
            {seasonEpisodes.map(ep => (
              <Link key={ep.id} to={`/watch-episode/${show.id}/${ep.id}`} className="episode-card">
                <div className="ep-thumb">
                  <img src={ep.thumbnail} alt={ep.title} loading="lazy" />
                  <div className="ep-play"><Play size={20} fill="white" /></div>
                </div>
                <div className="ep-info">
                  <p className="ep-number">S{ep.season} E{ep.episode}</p>
                  <p className="ep-title">{ep.title}</p>
                  <p className="ep-desc">{ep.description}</p>
                </div>
                <span className="ep-duration">{ep.duration}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
