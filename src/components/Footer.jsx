import { Link } from 'react-router-dom';
import { Film, Github, Twitter, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Film size={28} />
              <span>Movie<span>Sphere</span></span>
            </Link>
            <p>Your Universe of Movies. Discover, explore, and enjoy thousands of films and TV series — completely free, no account needed.</p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="Youtube"><Youtube size={18} /></a>
              <a href="#" aria-label="Github"><Github size={18} /></a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Browse</h4>
              <Link to="/">Home</Link>
              <Link to="/movies">Movies</Link>
              <Link to="/series">TV Series</Link>
              <Link to="/genres">Genres</Link>
              <Link to="/trending">Trending</Link>
              <Link to="/watchlist">Watchlist</Link>
            </div>
            <div className="footer-col">
              <h4>Genres</h4>
              <Link to="/genres/action">Action</Link>
              <Link to="/genres/comedy">Comedy</Link>
              <Link to="/genres/drama">Drama</Link>
              <Link to="/genres/sci-fi">Sci-Fi</Link>
              <Link to="/genres/horror">Horror</Link>
              <Link to="/genres/thriller">Thriller</Link>
            </div>
            <div className="footer-col">
              <h4>Info</h4>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">DMCA</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MovieSphere. All rights reserved. For entertainment purposes only.</p>
          <p>Demo videos are public domain. No copyrighted content is hosted.</p>
        </div>
      </div>
    </footer>
  );
}
