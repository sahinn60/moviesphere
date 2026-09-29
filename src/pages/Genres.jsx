import { Link } from 'react-router-dom';
import { genres } from '../data/cast';
import GenreCard from '../components/GenreCard';
import './Genres.css';

export default function Genres() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Browse by Genre</h1>
          <p>Find movies and series by your favorite genre</p>
        </div>
        <div className="genres-page-grid">
          {genres.map(g => <GenreCard key={g.id} genre={g} />)}
        </div>
      </div>
    </div>
  );
}
