import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MODELS_COLLECTION = [
  {
    id: "01",
    name: "PHANTOM",
    series: "MAGNUM OPUS",
    quote: "A sanctuary for the mind.",
    video: "/images/bughatti.mp4",
    details: "The most recognizable silhouette in the world. Reimagined with a laser-cut grille and starlight headlights.",
    path: "/bespoke",
    specs: ["6.75L V12", "563 BHP", "900 NM"]
  },
  {
    id: "02",
    name: "SPECTRE",
    series: "L'AVENIR",
    quote: "Silence is the ultimate luxury.",
    video: "/images/dodge.mp4",
    details: "The electric prophecy fulfilled. A spiritual successor to the Phantom Coupé, built for the future.",
    path: "/gallery",
    specs: ["Electric", "584 BHP", "900 NM"]
  },
  {
    id: "03",
    name: "CULLINAN",
    series: "BLACK BADGE",
    quote: "The earth is yours.",
    video: "/images/porche.mp4",
    details: "Effortless, everywhere. The absolute peak of all-terrain luxury, refined for those who lead.",
    path: "/bespoke",
    specs: ["6.75L V12", "600 BHP", "900 NM"]
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

export default function Models() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {loading && <LuxuryPreloader progress={loadProgress} />}
      <div className="models-root" style={{ 
        backgroundColor: '#000', 
        color: '#fff', 
        overflowX: 'hidden',
        opacity: loading ? 0 : 1,
        transition: 'opacity 2s ease'
      }}>
        
        {/* 1. ANIMATED HERO */}
        <section className="hero-section">
          <div className="parallax-bg-text" style={{ 
            transform: `translateY(${scrollY * 0.5}px)`, 
          }}>
            PERFECTION
          </div>
          
          <div style={{ zIndex: 1, textAlign: 'center' }}>
            <h2 className="hero-sub">THE 2026 COLLECTION</h2>
            <h1 className="hero-main">The Pantheon</h1>
          </div>
        </section>

        {/* 2. THE MODELS EXHIBITION */}
        {MODELS_COLLECTION.map((car, index) => (
          <section key={car.id} className="model-exhibition-section">
            
            <div className="sticky-header">
              <div className="header-text-group">
                 <h3 className="car-series">{car.series}</h3>
                 <h2 className="car-name">{car.name}</h2>
              </div>
              
              <button 
                onClick={() => navigate(car.path)}
                className="luxury-button-outline"
              >
                EXPLORE
              </button>
            </div>

            <div className="video-viewport">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                style={{ 
                  width: '100%', 
                  height: '110%',
                  objectFit: 'cover',
                  filter: 'brightness(0.7) contrast(1.1)',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: `scale(${1 + (scrollY * 0.0001)})` 
                }} 
              >
                <source src={car.video} type="video/mp4" />
              </video>
            </div>

            <div className={`details-row ${index % 2 === 0 ? 'row-reverse' : ''}`}>
              <div className="details-card">
                <p className="car-quote">"{car.quote}"</p>
                <p className="car-details-text">{car.details}</p>
                
                <div className="specs-grid">
                  {car.specs.map(spec => (
                    <div key={spec} className="spec-item">
                      <p>{spec}</p>
                      <div className="spec-line" />
                    </div>
                  ))}
                </div>

                <div className="actions-flex">
                  <button onClick={() => navigate('/bespoke')} className="btn-primary">BESPOKE</button>
                  <button onClick={() => navigate('/gallery')} className="btn-secondary">GALLERY</button>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* 3. CLOSING CTA */}
        <section className="closing-cta">
          <div className="divider-line" />
          <h3 className="closing-text">Every Great Journey Starts With A Whisper.</h3>
          <button onClick={() => navigate('/')} className="return-btn">RETURN HOME</button>
        </section>

        <style>{`
          /* BASE RESPONSIVE CLASSES */
          .hero-section {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 5%;
            position: relative;
          }

          .parallax-bg-text {
            position: absolute;
            font-size: 25vw;
            font-weight: 900;
            opacity: 0.03;
            letter-spacing: -1.5vw;
            white-space: nowrap;
            z-index: 0;
            pointer-events: none;
            transition: transform 0.1s linear;
          }

          .hero-sub {
            font-size: clamp(10px, 1.2vw, 14px);
            letter-spacing: clamp(10px, 1.5vw, 20px);
            opacity: 0.4;
            margin-bottom: 20px;
            animation: fadeInUp 1.5s ease;
          }

          .hero-main {
            font-size: clamp(3.5rem, 12vw, 12rem);
            font-weight: 200;
            font-family: serif;
            margin: 0;
            font-style: italic;
            line-height: 0.9;
            animation: fadeInUp 2s ease;
          }

          .model-exhibition-section {
            min-height: 150vh;
            padding: 0 5%;
            position: relative;
            margin-bottom: 10vh;
          }

          .sticky-header {
            position: sticky;
            top: 12%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            z-index: 10;
            padding-bottom: 2vh;
            background: linear-gradient(to bottom, #000 60%, transparent);
          }

          .car-series { font-size: clamp(10px, 0.8vw, 12px); letter-spacing: 5px; opacity: 0.4; margin-bottom: 5px; text-transform: uppercase; }
          .car-name { font-size: clamp(2.5rem, 8vw, 7rem); fontWeight: 200; margin: 0; letter-spacing: 4px; }

          .luxury-button-outline {
            background: none; border: none; color: #fff; fontSize: clamp(9px, 0.7vw, 11px);
            letterSpacing: 4px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.3);
            padding-bottom: 8px; margin-bottom: 15px; transition: all 0.4s ease;
          }

          .video-viewport {
            width: 100%;
            height: clamp(300px, 75vh, 900px);
            background-color: #0a0a0a;
            overflow: hidden;
            position: relative;
            margin-top: 2vh;
          }

          .details-row {
            display: flex;
            margin-top: -10vh;
            padding-bottom: 10vh;
            position: relative;
            z-index: 15;
          }
          .row-reverse { justify-content: flex-end; }

          .details-card {
            width: 100%;
            max-width: 600px;
            padding: clamp(30px, 5vw, 80px);
            background-color: rgba(5, 5, 5, 0.9);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255,255,255,0.05);
          }

          .car-quote { font-size: clamp(1.2rem, 2.5vw, 2rem); font-family: serif; font-style: italic; margin-bottom: 30px; }
          .car-details-text { font-size: clamp(13px, 1.1vw, 15px); line-height: 1.8; opacity: 0.5; margin-bottom: 40px; }

          .specs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 40px; }
          .spec-item p { font-size: clamp(11px, 1vw, 14px); font-weight: 300; margin: 0; }
          .spec-line { width: 15px; height: 1px; background: rgba(255,255,255,0.2); margin-top: 8px; }

          .actions-flex { display: flex; gap: 15px; flex-wrap: wrap; }
          .btn-primary { flex: 1; min-width: 140px; padding: 18px; background: #fff; color: #000; border: none; font-size: 10px; letter-spacing: 2px; font-weight: 700; cursor: pointer; }
          .btn-secondary { flex: 1; min-width: 140px; padding: 18px; background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.2); font-size: 10px; letter-spacing: 2px; cursor: pointer; }

          .closing-cta { height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0 10%; }
          .divider-line { width: 1px; height: 15vh; background: linear-gradient(to bottom, transparent, #fff); marginBottom: 40px; }
          .closing-text { font-size: clamp(1.5rem, 4vw, 3.5rem); fontWeight: 100; font-family: serif; maxWidth: 800px; line-height: 1.3; }
          .return-btn { margin-top: 40px; padding: 20px 50px; background: none; border: 1px solid rgba(255,255,255,0.3); color: #fff; letter-spacing: 5px; font-size: 11px; cursor: pointer; transition: 0.5s; }

          @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

          /* MOBILE OVERRIDES */
          @media (max-width: 768px) {
            .model-exhibition-section { min-height: auto; margin-bottom: 15vh; }
            .sticky-header { position: relative; top: 0; flex-direction: column; align-items: flex-start; gap: 20px; background: none; margin-bottom: 20px;}
            .details-row { margin-top: 20px; justify-content: center !important; }
            .details-card { padding: 30px 20px; }
            .video-viewport { height: 50vh; }
            .specs-grid { grid-template-columns: 1fr; gap: 20px; }
          }
        `}</style>
      </div>
    </>
  );
}