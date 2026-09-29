import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ms_watchlist') || '[]');
    } catch { return []; }
  });

  const [continueWatching, setContinueWatching] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ms_continue') || '[]');
    } catch { return []; }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('ms_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('ms_continue', JSON.stringify(continueWatching));
  }, [continueWatching]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToWatchlist = (movie) => {
    if (!watchlist.find(m => m.id === movie.id)) {
      setWatchlist(prev => [movie, ...prev]);
      showToast(`"${movie.title}" added to watchlist`);
    } else {
      removeFromWatchlist(movie.id);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(prev => prev.filter(m => m.id !== id));
    showToast('Removed from watchlist', 'info');
  };

  const isInWatchlist = (id) => watchlist.some(m => m.id === id);

  const addToContinueWatching = (movie) => {
    setContinueWatching(prev => {
      const filtered = prev.filter(m => m.id !== movie.id);
      return [{ ...movie, watchedAt: Date.now() }, ...filtered].slice(0, 10);
    });
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist, continueWatching, toast,
      addToWatchlist, removeFromWatchlist, isInWatchlist, addToContinueWatching
    }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);
