import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Models from './pages/Models';
import Gallery from './pages/gallery';
import Bespoke from './pages/bespoke';

export default function App() {
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AUTO-CLOSE menu when moving to a new page
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinkStyle = (path) => ({
    textDecoration: 'none',
    color: 'white',
    fontSize: '10px',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    opacity: location.pathname === path ? 1 : 0.4,
    fontWeight: location.pathname === path ? '600' : '300',
    borderBottom: location.pathname === path ? '1px solid white' : '1px solid transparent',
    paddingBottom: '4px',
    pointerEvents: 'auto'
  });

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', minHeight: '100vh', margin: 0 }}>
      
      {/* 1. PROGRESS HUD */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '2px', background: 'white',
        width: `${scrollProgress}%`, zIndex: 10000, transition: 'width 0.1s ease-out'
      }} />

      {/* 2. NAVIGATION BAR */}
      <nav className="main-nav">
        <div className="nav-logo">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', letterSpacing: '10px', fontSize: '1.2rem', fontFamily: '"Times New Roman", serif', pointerEvents: 'auto' }}>
            The Archive
          </Link>
          <span className="logo-subtext">BESPOKE ATELIER</span>
        </div>
        
        <div className="nav-links-desktop">
          <Link to="/" style={navLinkStyle('/')}>Home</Link>
          <Link to="/models" style={navLinkStyle('/models')}>Models</Link>
          <Link to="/gallery" style={navLinkStyle('/gallery')}>Gallery</Link>
          <Link to="/bespoke" style={navLinkStyle('/bespoke')}>Bespoke</Link>
        </div>

        {/* MOBILE TOGGLE - Transitions to 'X' when open */}
        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {/* <span style={{ fontSize: '9px', letterSpacing: '2px', marginRight: '10px', opacity: 0.6 }}>
            {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
          </span> */}
          <div className="burger-icon">
            <div className={`line ${isMobileMenuOpen ? 'open' : ''}`} />
            <div className={`line ${isMobileMenuOpen ? 'open' : ''}`} />
          </div>
        </button>
      </nav>

      {/* 3. MOBILE MENU OVERLAY */}
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-links">
          <Link to="/">Home</Link>
          <Link to="/models">Models</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/bespoke">Bespoke</Link>
          
          {/* Explicit Close Button for UX clarity */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              background: 'none', border: '1px solid rgba(255,255,255,0.2)', 
              color: 'white', marginTop: '40px', padding: '15px 40px',
              fontSize: '10px', letterSpacing: '5px', cursor: 'pointer'
            }}
          >
            EXIT EXHIBITION
          </button>
        </div>
      </div>

      {/* 4. PAGE VIEWPORT */}
      <div className="page-transition-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/bespoke" element={<Bespoke />} />
        </Routes>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;600&display=swap');

        body { font-family: 'Inter', sans-serif; margin: 0; background: #050505; }

        .main-nav {
          position: fixed; top: 0; width: 100%; padding: 40px 6%;
          display: flex; justify-content: space-between; align-items: flex-start;
          z-index: 9000; box-sizing: border-box; mix-blend-mode: difference;
          pointer-events: none;
        }

        .nav-logo, .nav-links-desktop, .mobile-toggle { pointer-events: auto; }

        .logo-subtext { font-size: 8px; letter-spacing: 5px; opacity: 0.5; display: block; margin-top: 5px; color: white; }

        .nav-links-desktop { display: flex; gap: 40px; margin-top: 10px; }

        .mobile-toggle { 
          display: none; background: none; border: none; align-items: center;
          cursor: pointer; padding: 10px; z-index: 10001; color: white;
        }

        .burger-icon { display: flex; flex-direction: column; gap: 6px; }
        .burger-icon .line { width: 20px; height: 1px; background: white; transition: 0.4s ease; }
        .burger-icon .line.open:nth-child(1) { transform: translateY(3.5px) rotate(45deg); }
        .burger-icon .line.open:nth-child(2) { transform: translateY(-3.5px) rotate(-45deg); }

        .mobile-overlay {
          position: fixed; inset: 0; background: #050505; 
          z-index: 9500; display: flex; justify-content: center; align-items: center;
          transform: translateY(-100%); transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .mobile-overlay.active { transform: translateY(0); }

        .mobile-links { display: flex; flex-direction: column; gap: 35px; text-align: center; }
        .mobile-links a { 
          color: white; text-decoration: none; font-size: 1.8rem; 
          letter-spacing: 8px; text-transform: uppercase; font-weight: 200;
        }

        .page-transition-wrapper { position: relative; z-index: 1; }

        @media (max-width: 900px) {
          .nav-links-desktop { display: none; }
          .mobile-toggle { display: flex; }
        }
      `}</style>
    </div>
  );
}