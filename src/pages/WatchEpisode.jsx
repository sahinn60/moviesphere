import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import { series } from '../data/series';
import { useEffect } from 'react';
import './WatchEpisode.css';

export default function WatchEpisode() {
  const { seriesId, episodeId } = useParams();
  const show = series.find(s => s.id === parseInt(seriesId));
  const episode = show?.episodes?.find(e => e.id === parseInt(episodeId));

  if (!show || !episode) return (
    <div className="page-wrapper container" style={{ paddingTop: 120, textAlign: 'center' }}>
      <h2>Episode not found</h2>
      <Link to="/series" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>Browse Series</Link>
    </div>
  );

  const allEps = show.episodes || [];
  const currentIdx = allEps.findIndex(e => e.id === episode.id);
  const nextEp = allEps[currentIdx + 1];

  return (
    <div className="watch-page page-wrapper">
      <div className="container">
        <div className="watch-breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/series">Series</Link>
          <ChevronRight size={14} />
          <Link to={`/series/${show.id}`}>{show.title}</Link>
          <ChevronRight size={14} />
          <span>S{episode.season} E{episode.episode}</span>
        </div>

        <div className="watch-layout">
          <div className="watch-main">
            <VideoPlayer src={episode.videoUrl} title={`${show.title} - ${episode.title}`} />
            <div className="watch-info">
              <p className="ep-series-name">{show.title}</p>
              <h1 className="watch-title">{episode.title}</h1>
              <div className="watch-meta">
                <span>Season {episode.season}</span>
                <span>Episode {episode.episode}</span>
                <span>{episode.duration}</span>
              </div>
              <p className="watch-desc">{episode.description}</p>
            </div>
          </div>

          <div className="watch-sidebar">
            {nextEp && (
              <>
                <h3 className="sidebar-title">Next Episode</h3>
                <Link to={`/watch-episode/${show.id}/${nextEp.id}`} className="next-card">
                  <img src={nextEp.thumbnail} alt={nextEp.title} />
                  <div>
                    <p className="next-title">{nextEp.title}</p>
                    <p className="next-meta">S{nextEp.season} E{nextEp.episode} · {nextEp.duration}</p>
                  </div>
                </Link>
              </>
            )}
            <h3 className="sidebar-title" style={{ marginTop: 24 }}>All Episodes</h3>
            {allEps.map(ep => (
              <Link key={ep.id} to={`/watch-episode/${show.id}/${ep.id}`} className={`next-card ${ep.id === episode.id ? 'active-ep' : ''}`}>
                <img src={ep.thumbnail} alt={ep.title} style={{ aspectRatio: '16/9', height: 60, width: 100 }} />
                <div>
                  <p className="next-title">{ep.title}</p>
                  <p className="next-meta">S{ep.season} E{ep.episode} · {ep.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
