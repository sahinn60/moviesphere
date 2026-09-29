import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import MovieGrid from '../components/MovieGrid';
import { movies } from '../data/movies';
import { series } from '../data/series';
import FilterPanel from '../components/FilterPanel';
import './SearchPage.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    genre: '', year: '', rating: '', language: '', sort: 'popular'
  });
  const [tab, setTab] = useState('all');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setFilters(f => ({ ...f, search: q }));
  }, [searchParams]);

  const applyFilters = (list) => {
    let result = [...list];
    if (filters.search) result = result.filter(m => m.title.toLowerCase().includes(filters.search.toLowerCase()) || m.genres?.some(g => g.toLowerCase().includes(filters.search.toLowerCase())));
    if (filters.genre) result = result.filter(m => m.genres?.includes(filters.genre));
    if (filters.year) result = result.filter(m => String(m.year) === filters.year);
    if (filters.rating) result = result.filter(m => m.rating >= parseFloat(filters.rating));
    return result;
  };

  const filteredMovies = useMemo(() => applyFilters(movies), [filters]);
  const filteredSeries = useMemo(() => applyFilters(series), [filters]);
  const allResults = [...filteredMovies, ...filteredSeries.map(s => ({ ...s, isSeries: true }))];

  const displayed = tab === 'movies' ? filteredMovies : tab === 'series' ? filteredSeries : allResults;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="search-hero">
          <h1>Search</h1>
          <p>Find movies, TV series, and more</p>
        </div>

        <FilterPanel filters={filters} onChange={setFilters} />

        <div className="search-tabs">
          {[['all', `All (${allResults.length})`], ['movies', `Movies (${filteredMovies.length})`], ['series', `Series (${filteredSeries.length})`]].map(([val, label]) => (
            <button key={val} className={`tab-btn ${tab === val ? 'active' : ''}`} onClick={() => setTab(val)}>{label}</button>
          ))}
        </div>

        {!filters.search && !filters.genre && !filters.year && !filters.rating ? (
          <div className="search-empty">
            <Search size={48} />
            <h3>Search for movies & series</h3>
            <p>Type a title, genre, or keyword to get started</p>
          </div>
        ) : (
          <MovieGrid movies={displayed} type={tab === 'series' ? 'series' : 'movie'} />
        )}
      </div>
    </div>
  );
}
