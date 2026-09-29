import { Link } from 'react-router-dom';
import './GenreCard.css';

export default function GenreCard({ genre }) {
  return (
    <Link to={`/genres/${genre.id}`} className="genre-card">
      <img src={genre.image} alt={genre.name} loading="lazy" />
      <div className="genre-overlay" style={{ background: `linear-gradient(135deg, ${genre.color}99, ${genre.color}33)` }} />
      <div className="genre-content">
        <span className="genre-icon">{genre.icon}</span>
        <span className="genre-name">{genre.name}</span>
      </div>
    </Link>
  );
}
