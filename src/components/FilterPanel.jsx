import { Search, SlidersHorizontal, X } from 'lucide-react';
import './FilterPanel.css';

const GENRES = ['Action','Adventure','Animation','Comedy','Crime','Documentary','Drama','Fantasy','Horror','Romance','Sci-Fi','Thriller'];
const YEARS = ['2024','2023','2022','2021','2020','2019','2018'];
const RATINGS = ['9+','8+','7+','6+'];
const LANGUAGES = ['English','Japanese','French','Spanish','Korean','Hindi'];
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'latest', label: 'Latest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'az', label: 'A-Z' },
];

export default function FilterPanel({ filters, onChange }) {
  const set = (key, val) => onChange({ ...filters, [key]: val });
  const clear = () => onChange({ search: '', genre: '', year: '', rating: '', language: '', sort: 'popular' });

  const hasFilters = filters.genre || filters.year || filters.rating || filters.language || filters.search;

  return (
    <div className="filter-panel">
      <div className="filter-search">
        <Search size={18} />
        <input
          value={filters.search}
          onChange={e => set('search', e.target.value)}
          placeholder="Search movies, series..."
        />
        {filters.search && <button onClick={() => set('search', '')}><X size={16} /></button>}
      </div>
      <div className="filter-row">
        <select value={filters.genre} onChange={e => set('genre', e.target.value)}>
          <option value="">All Genres</option>
          {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={filters.year} onChange={e => set('year', e.target.value)}>
          <option value="">All Years</option>
          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={filters.rating} onChange={e => set('rating', e.target.value)}>
          <option value="">All Ratings</option>
          {RATINGS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filters.language} onChange={e => set('language', e.target.value)}>
          <option value="">All Languages</option>
          {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={filters.sort} onChange={e => set('sort', e.target.value)}>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {hasFilters && (
          <button className="clear-btn" onClick={clear}><X size={14} /> Clear</button>
        )}
      </div>
    </div>
  );
}
