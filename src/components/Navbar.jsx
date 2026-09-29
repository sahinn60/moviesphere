import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Bookmark, Menu, X, Film } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Movies' },
    { to: '/series', label: 'TV Series' },
    { to: '/genres', label: 'Genres' },
    { to: '/trending', label: 'Trending' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <Film size={24} />
          <span>Movie<span className="logo-accent">Sphere</span></span>
        </Link>

        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="nav-search-form">
              <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search movies..." />
              <button type="button" onClick={() => setSearchOpen(false)}><X size={16} /></button>
            </form>
          ) : (
            <button className="nav-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search size={20} />
            </button>
          )}
          <Link to="/watchlist" className="nav-icon-btn watchlist-btn" aria-label="Watchlist">
            <Bookmark size={20} />
            {watchlist.length > 0 && <span className="badge-count">{watchlist.length}</span>}
          </Link>
          <button className="nav-icon-btn mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setMenuOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/watchlist" onClick={() => setMenuOpen(false)}>
            Watchlist {watchlist.length > 0 && `(${watchlist.length})`}
          </NavLink>
        </div>
      )}
    </nav>
  );
}
