import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Watch from './pages/Watch';
import Series from './pages/Series';
import SeriesDetail from './pages/SeriesDetail';
import WatchEpisode from './pages/WatchEpisode';
import SearchPage from './pages/SearchPage';
import Watchlist from './pages/Watchlist';
import Trending from './pages/Trending';
import Genres from './pages/Genres';
import GenrePage from './pages/GenrePage';

export default function App() {
  return (
    <BrowserRouter>
      <WatchlistProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/series" element={<Series />} />
          <Route path="/series/:id" element={<SeriesDetail />} />
          <Route path="/watch-episode/:seriesId/:episodeId" element={<WatchEpisode />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/:slug" element={<GenrePage />} />
          <Route path="*" element={
            <div className="page-wrapper container" style={{ paddingTop: 120, textAlign: 'center' }}>
              <h2 style={{ fontSize: '4rem', marginBottom: 16 }}>404</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Page not found</p>
              <a href="/" className="btn btn-primary" style={{ display: 'inline-flex' }}>Go Home</a>
            </div>
          } />
        </Routes>
        <Footer />
        <Toast />
      </WatchlistProvider>
    </BrowserRouter>
  );
}
