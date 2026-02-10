import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Models from './pages/Models';
import Gallery from './pages/Gallery';
import Bespoke from './pages/Bespoke';

export default function App() {
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / (totalScroll || 1)) * 100;
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
    pointerEvents: 'auto',
    transition: 'opacity 0.3s ease, border-bottom 0.3s ease'
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
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', textDecoration: 'none', letterSpacing: '10px', fontSize: '1.2rem', fontFamily: '"Playfair Display", serif', pointerEvents: 'auto' }}>
            THE ARCHIVE
          </Link>
          <span className="logo-subtext">BESPOKE ATELIER</span>
        </div>
        
        <div className="nav-links-desktop">
          <Link to="/" style={navLinkStyle('/')}>Home</Link>
          <Link to="/models" style={navLinkStyle('/models')}>Models</Link>
          <Link to="/gallery" style={navLinkStyle('/gallery')}>Gallery</Link>
          <Link to="/bespoke" style={navLinkStyle('/bespoke')}>Bespoke</Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="burger-icon">
            <div className={`line ${isMobileMenuOpen ? 'open' : ''}`} />
            <div className={`line ${isMobileMenuOpen ? 'open' : ''}`} />
          </div>
        </button>
      </nav>

      {/* 3. MOBILE MENU OVERLAY */}
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/models" className={location.pathname === '/models' ? 'active' : ''}>Models</Link>
          <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
          <Link to="/bespoke" className={location.pathname === '/bespoke' ? 'active' : ''}>Bespoke</Link>
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              background: 'none', border: '1px solid rgba(255,255,255,0.2)', 
              color: 'white', marginTop: '40px', padding: '15px 40px',
              fontSize: '10px', letterSpacing: '5px', cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            Exit Exhibition
          </button>
        </div>
      </div>

      {/* 4. PAGE VIEWPORT */}
      <div className="page-transition-wrapper">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/bespoke" element={<Bespoke />} />
        </Routes>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@100;300;600&display=swap');

        body { font-family: 'Inter', sans-serif; margin: 0; background: #050505; }

        .main-nav {
          position: fixed; top: 0; width: 100%; padding: 40px 6%;
          display: flex; justify-content: space-between; align-items: flex-start;
          z-index: 9000; box-sizing: border-box; mix-blend-mode: difference;
          pointer-events: none;
        }

        .nav-logo, .nav-links-desktop, .mobile-toggle { pointer-events: auto; }

        .logo-subtext { font-size: 8px; letter-spacing: 5px; opacity: 0.5; display: block; margin-top: 5px; color: white; text-transform: uppercase; }

        .nav-links-desktop { display: flex; gap: 40px; margin-top: 10px; }

        .mobile-toggle { 
          display: none; background: none; border: none; align-items: center;
          cursor: pointer; padding: 10px; z-index: 10001; color: white;
        }

        .burger-icon { display: flex; flex-direction: column; gap: 6px; }
        .burger-icon .line { width: 24px; height: 1px; background: white; transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .burger-icon .line.open:nth-child(1) { transform: translateY(3.5px) rotate(45deg); }
        .burger-icon .line.open:nth-child(2) { transform: translateY(-3.5px) rotate(-45deg); }

        .mobile-overlay {
          position: fixed; inset: 0; background: #050505; 
          z-index: 9500; display: flex; justify-content: center; align-items: center;
          transform: translateY(-100%); transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-overlay.active { transform: translateY(0); }

        .mobile-links { display: flex; flex-direction: column; gap: 30px; text-align: center; }
        .mobile-links a { 
          color: white; text-decoration: none; font-size: 2rem; 
          letter-spacing: 10px; text-transform: uppercase; font-weight: 200;
          font-family: 'Playfair Display', serif;
          opacity: 0.4;
          transition: 0.4s;
        }
        .mobile-links a.active { opacity: 1; }

        .page-transition-wrapper { 
          animation: fadeIn 1.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 900px) {
          .nav-links-desktop { display: none; }
          .mobile-toggle { display: flex; }
          .main-nav { padding: 30px 6%; }
        }
      `}</style>
    </div>
  );
}