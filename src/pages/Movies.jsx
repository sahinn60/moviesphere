import { useState, useMemo } from 'react';
import FilterPanel from '../components/FilterPanel';
import MovieGrid from '../components/MovieGrid';
import { movies } from '../data/movies';
import './Movies.css';

const applyFilters = (list, f) => {
  let result = [...list];
  if (f.search) result = result.filter(m => m.title.toLowerCase().includes(f.search.toLowerCase()) || m.genres.some(g => g.toLowerCase().includes(f.search.toLowerCase())));
  if (f.genre) result = result.filter(m => m.genres.includes(f.genre));
  if (f.year) result = result.filter(m => String(m.year) === f.year);
  if (f.rating) result = result.filter(m => m.rating >= parseFloat(f.rating));
  if (f.language) result = result.filter(m => m.language === f.language);
  if (f.sort === 'latest') result.sort((a, b) => b.year - a.year);
  else if (f.sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  else if (f.sort === 'az') result.sort((a, b) => a.title.localeCompare(b.title));
  else result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  return result;
};

export default function Movies() {
  const [filters, setFilters] = useState({ search: '', genre: '', year: '', rating: '', language: '', sort: 'popular' });
  const filtered = useMemo(() => applyFilters(movies, filters), [filters]);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header">
          <h1>Explore Movies</h1>
          <p>{filtered.length} movies found</p>
        </div>
        <FilterPanel filters={filters} onChange={setFilters} />
        <MovieGrid movies={filtered} />
      </div>
    </div>
  );
}
