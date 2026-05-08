import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('varsaka_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  const isContactActive = location.pathname === '/' && location.hash === '#contact';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('varsaka_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const closeMenu = () => setMenuOpen(false);

  const handleHomeClick = (e) => {
    closeMenu();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <Link to="/" className="logo" onClick={handleHomeClick}>
        <img src={logo} alt="Varsaka Labs Logo" style={{ height: 44, borderRadius: 6 }} />
      </Link>

      <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
        <li>
          <NavLink 
            to="/" 
            end 
            onClick={handleHomeClick} 
            className={({ isActive }) => (isActive && !isContactActive ? 'active' : '')}
          >
            Home
          </NavLink>
        </li>
        <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
        <li><NavLink to="/careers" onClick={closeMenu}>Careers</NavLink></li>
        <li><NavLink to="/blog" onClick={closeMenu}>Blog</NavLink></li>
        <li><NavLink to="/case-studies" onClick={closeMenu}>Case Studies</NavLink></li>
        <li>
          <a 
            href="/#contact" 
            onClick={closeMenu} 
            className={isContactActive ? 'active' : ''}
          >
            Contact
          </a>
        </li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <a href="/#contact" className="nav-cta" onClick={closeMenu}>Get Free Consult →</a>
      </div>

      <button
        className="mobile-menu-btn"
        aria-label="Toggle Menu"
        onClick={() => setMenuOpen(o => !o)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>
    </nav>
  );
}
