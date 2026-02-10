import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 1. DESIGN SYSTEM CONSTANTS
 */
const THEME = {
  black: '#050505',
  silver: '#E5E5E5',
  gold: '#C5B358',
  white: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.03)',
  border: 'rgba(255, 255, 255, 0.08)',
  timing: '1.2s cubic-bezier(0.16, 1, 0.3, 1)',
  fontSerif: '"Playfair Display", serif',
  fontSans: '"Inter", sans-serif'
};

const DATA = [
  {
    id: "01",
    title: "PHANTOM",
    subtitle: "The Magnum Opus",
    hex: "#0F0F0F",
    meta: { v: "6.75L V12", t: "900 NM", s: "SILENT" },
    desc: "A sanctuary for those who lead. Phantom represents the pinnacle of human craft, where every stitch and veneer is an echo of perfection.",
    video: "/images/bughatti.mp4" 
  },
  {
    id: "02",
    title: "SPECTRE",
    subtitle: "Electric Prophecy",
    hex: "#0A1015",
    meta: { v: "DUAL MOTOR", t: "900 NM", s: "ELECTRIC" },
    desc: "The world's first ultra-luxury electric super-coupe. A spiritual successor to the Phantom Coupé, representing the dawn of a new era.",
    video: "/images/dodge.mp4" 
  },
  {
    id: "03",
    title: "CULLINAN",
    subtitle: "Peak Capability",
    hex: "#080808",
    meta: { v: "6.75L V12", t: "850 NM", s: "ALL-TERRAIN" },
    desc: "Unshakeable in its resolve. Cullinan provides the ultimate luxury experience, regardless of the terrain beneath its wheels.",
    video: "/images/porche.mp4" 
  }
];

const LuxuryPreloader = ({ progress }) => (
  <div style={{
    position: 'fixed',
    inset: 0,
    backgroundColor: '#050505',
    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)'
  }}>
    <div style={{
      width: '1px',
      height: '150px',
      background: 'rgba(255,255,255,0.1)',
      position: 'relative',
      marginBottom: '40px'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${progress}%`,
        background: '#fff',
        transition: 'height 0.4s ease'
      }} />
    </div>
    <h2 style={{
      fontFamily: 'serif',
      fontSize: '10px',
      letterSpacing: '15px',
      color: '#fff',
      marginRight: '-15px',
      opacity: 0.6,
      textTransform: 'uppercase'
    }}>
      The Archive
    </h2>
    <span style={{
      fontSize: '8px',
      letterSpacing: '4px',
      marginTop: '20px',
      color: '#C5B358',
      opacity: progress > 90 ? 1 : 0.4,
      transition: 'opacity 0.5s'
    }}>
      {progress < 100 ? `SYNCHRONIZING ${progress}%` : "ENTERING EXHIBITION"}
    </span>
  </div>
);

const Cursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const m = (e) => setPos({ x: e.clientX, y: e.clientY });
    const d = () => setScale(1.5);
    const u = () => setScale(1);
    window.addEventListener('mousemove', m);
    window.addEventListener('mousedown', d);
    window.addEventListener('mouseup', u);
    return () => {
      window.removeEventListener('mousemove', m);
      window.removeEventListener('mousedown', d);
      window.removeEventListener('mouseup', u);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', left: pos.x, top: pos.y,
      width: '40px', height: '40px', border: `1px solid ${THEME.white}`, borderRadius: '50%',
      transform: `translate(-50%, -50%) scale(${scale})`, pointerEvents: 'none', zIndex: 9999,
      transition: 'transform 0.15s ease-out, opacity 0.3s'
    }} />
  );
};

const HUD = ({ current, total, onNext, onPrev, exit }) => (
  <nav style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
    <div style={{ position: 'absolute', bottom: '60px', left: '6%', right: '6%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 200 }}>0{current + 1} / 0{total}</span>
        <div style={{ width: '100px', height: '1px', background: THEME.border }}>
          <div style={{ width: `${((current + 1) / total) * 100}%`, height: '100%', background: '#fff', transition: 'width 0.8s' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1px' }}>
        <button onClick={onPrev} className="nav-button">PREVIOUS</button>
        <button onClick={onNext} className="nav-button" style={{ background: '#fff', color: '#000' }}>NEXT</button>
      </div>
    </div>
  </nav>
);

export default function Gallery() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const changeSlide = useCallback((dir) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setIndex((prev) => {
        if (dir === 'next') return (prev + 1) % DATA.length;
        return (prev - 1 + DATA.length) % DATA.length;
      });
      setTransitioning(false);
    }, 1000);
  }, [transitioning]);

  return (
    <div className="gallery-root">
      {loading && <LuxuryPreloader progress={loadProgress} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 2s ease', height: '100%', width: '100%' }}>
        <Cursor />
        <HUD 
          current={index} 
          total={DATA.length} 
          onNext={() => changeSlide('next')} 
          onPrev={() => changeSlide('prev')}
          exit={() => navigate('/')}
        />

        <main className={`canvas ${transitioning ? 'is-blur' : ''}`}>
          <div className="background-wrap">
            <video 
              key={DATA[index].video}
              autoPlay 
              muted 
              loop 
              playsInline 
              className="background-asset"
            >
              <source src={DATA[index].video} type="video/mp4" />
            </video>
            <div className="scrim" />
          </div>

          <section className="exhibition-frame">
            <div className="left-meta">
              <div className="reveal-box">
                <span className="accent-label">{DATA[index].subtitle}</span>
              </div>
              <div className="reveal-box">
                <h1 className="big-title">{DATA[index].title}</h1>
              </div>
              <div className="reveal-box">
                <p className="description-text">{DATA[index].desc}</p>
              </div>
            </div>

            <div className="right-stats">
              {Object.entries(DATA[index].meta).map(([key, val]) => (
                <div key={key} className="stat-unit">
                  <span className="stat-label">{key === 'v' ? 'POWERPLANT' : key === 't' ? 'TORQUE' : 'NATURE'}</span>
                  <span className="stat-value">{val}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@100;300;600&display=swap');

        * { box-sizing: border-box; }
        
        .gallery-root {
          background: #000;
          color: #fff;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          cursor: none;
        }

        .canvas { width: 100%; height: 100%; position: relative; transition: filter 1s ease; }
        .is-blur { filter: brightness(0.2) blur(10px); }
        
        .background-wrap { position: absolute; inset: 0; z-index: 1; }
        .background-asset { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            filter: brightness(0.4); 
            transform: scale(1.02); 
        }
        
        .scrim { position: absolute; inset: 0; background: linear-gradient(90deg, #050505 0%, transparent 50%, #050505 100%); }
        
        .exhibition-frame {
          position: relative; z-index: 10;
          height: 100%; width: 100%;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          padding: 0 10%;
        }

        .left-meta { max-width: 800px; }
        .reveal-box { overflow: hidden; margin-bottom: 20px; }
        
        .accent-label { display: block; font-size: 12px; letter-spacing: 10px; color: ${THEME.gold}; text-transform: uppercase; animation: fadeInUp 1s forwards; }
        .big-title { font-family: 'Playfair Display'; font-size: clamp(4rem, 10vw, 12rem); font-weight: 200; margin: 0; letter-spacing: -2px; animation: fadeInUp 1.2s forwards; }
        .description-text { font-size: clamp(14px, 1.2vw, 18px); line-height: 2; opacity: 0.4; font-weight: 300; animation: fadeInUp 1.4s forwards; }

        .right-stats {
          display: flex; flex-direction: column; gap: 60px;
          border-left: 1px solid ${THEME.border};
          padding-left: 10%;
          justify-self: end;
        }
        .stat-label { display: block; font-size: 9px; letter-spacing: 4px; opacity: 0.3; margin-bottom: 10px; }
        .stat-value { font-size: 24px; font-weight: 200; font-family: 'Playfair Display'; font-style: italic; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-button {
          background: none; border: 1px solid ${THEME.border}; color: #fff;
          padding: 25px 50px; font-size: 10px; letter-spacing: 4px; cursor: pointer;
          transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-button:hover { background: #fff; color: #000; border-color: #fff; padding: 25px 65px; }

        @media (max-width: 1200px) {
          .exhibition-frame { grid-template-columns: 1fr; align-content: center; }
          .right-stats { flex-direction: row; border-left: none; border-top: 1px solid ${THEME.border}; padding: 40px 0 0 0; justify-self: start; }
          .big-title { font-size: 15vw; }
        }

        @media (max-width: 768px) {
          .description-text { display: none; }
          .right-stats { gap: 20px; }
          .big-title { margin-bottom: 40px; }
        }
      `}</style>
    </div>
  );
}