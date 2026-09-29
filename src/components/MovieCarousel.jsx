import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import './MovieCarousel.css';

export default function MovieCarousel({ title, movies, type = 'movie', viewAllLink }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir * 600, behavior: 'smooth' });
    }
  };

  return (
    <div className="carousel-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <div className="carousel-controls">
          {viewAllLink && <a href={viewAllLink} className="view-all">View All →</a>}
          <button className="carousel-btn" onClick={() => scroll(-1)} aria-label="Previous"><ChevronLeft size={18} /></button>
          <button className="carousel-btn" onClick={() => scroll(1)} aria-label="Next"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="carousel-track" ref={ref}>
        {movies.map(m => <MovieCard key={m.id} movie={m} type={type} />)}
      </div>
    </div>
  );
}
