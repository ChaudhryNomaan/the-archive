import React, { useState, useEffect } from 'react';

/**
 * ARCHITECTURAL CONSTANTS
 * Defining the Luxury Aesthetic with Motion
 */
const PALETTES = [
  { 
    id: 1, 
    name: 'GHOST WHITE', 
    hex: '#F8F8F8', 
    video: '/images/phantom.mp4', 
    desc: 'A pure, ethereal finish that captures every line of the silhouette with surgical precision.' 
  },
  { 
    id: 2, 
    name: 'TEMPEST BLUE', 
    hex: '#1B2631', 
    video: '/images/dodge.mp4', 
    desc: 'Deep, oceanic tones reflecting a storm over the Atlantic, offering a commanding presence.' 
  },
  { 
    id: 3, 
    name: 'BLACK BADGE', 
    hex: '#0A0A0A', 
    video: '/images/porche.mp4', 
    desc: 'The boldest expression of luxury, finished in a high-gloss absolute darkness.' 
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

export default function Bespoke() {
  const [selected, setSelected] = useState(PALETTES[0]);
  const [isChanging, setIsChanging] = useState(false);
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

  // Smooth Transition Handler
  const handlePaletteChange = (palette) => {
    if (palette.id === selected.id) return;
    setIsChanging(true);
    setTimeout(() => {
      setSelected(palette);
      setIsChanging(false);
    }, 600);
  };

  return (
    <div className="bespoke-root">
      {loading && <LuxuryPreloader progress={loadProgress} />}
      
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 2s ease' }}>
        {/* SECTION 1: THE CONFIGURATOR HERO */}
        <section className="config-hero">
          
          {/* LEFT: INFORMATION PANEL */}
          <div className="info-panel">
            <div className="reveal-container">
              <h1 className="bespoke-title">Tailored <br/> Essence</h1>
              <div className="line-accent" />
            </div>
            
            <div className="desc-container">
              <p className="bespoke-desc">{selected.desc}</p>
            </div>

            <div className="selector-group">
              <p className="ui-label">EXTERIOR FINISH</p>
              <div className="swatch-grid">
                {PALETTES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePaletteChange(p)}
                    className={`swatch-btn ${selected.id === p.id ? 'active' : ''}`}
                    style={{ backgroundColor: p.hex }}
                  >
                    <div className="swatch-hover-ring" />
                  </button>
                ))}
              </div>
              <p className="selected-name-label">{selected.name}</p>
            </div>

            <button className="primary-cta">START COMMISSION</button>
          </div>

          {/* RIGHT: DYNAMIC VISUAL VIEWPORT (Updated to Video) */}
          <div className="visual-viewport">
            <div className={`image-layer ${isChanging ? 'is-syncing' : ''}`}>
              <video
                key={selected.video} 
                autoPlay
                muted
                loop
                playsInline
                className="car-image"
                style={{ objectFit: 'cover' }}
              >
                <source src={selected.video} type="video/mp4" />
              </video>
              <div className="edge-vignette" />
            </div>
          </div>
        </section>

        {/* SECTION 2: THE MANIFESTO */}
        <section className="manifesto-section">
          <h2 className="ui-label center">THE CRAFT</h2>
          <blockquote className="manifesto-text">
            "At the Bespoke Collective, we do not simply build motor cars. We realize visions. Every stitch, every veneer, and every hue is a testament to the individual spirit."
          </blockquote>
        </section>

        {/* SECTION 3: THE MATERIAL ARCHIVE */}
        <section className="archive-section">
          <div className="archive-grid">
            <div className="archive-card">
              <div className="video-container" style={{ width: '100%', height: '500px', overflow: 'hidden', position: 'relative' }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none'
                  }}
                >
                  <source src="/images/bmw.mp4" type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1 }} />
              </div>
              <h3>I. SUMPTUOUS LEATHERS</h3>
              <p>Sourced from high-altitude alpine pastures, our hides are processed to retain natural suppleness.</p>
            </div>

            <div className="archive-card">
              <div className="video-container" style={{ width: '100%', height: '500px', overflow: 'hidden', position: 'relative' }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none'
                  }}
                >
                  <source src="/images/porche.mp4" type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1 }} />
              </div>
              <h3>I. SUMPTUOUS LEATHERS</h3>
              <p>Sourced from high-altitude alpine pastures, our hides are processed to retain natural suppleness.</p>
            </div>

            <div className="archive-card">
              <div className="video-container" style={{ width: '100%', height: '500px', overflow: 'hidden', position: 'relative' }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none'
                  }}
                >
                  <source src="/images/phantom.mp4" type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1 }} />
              </div>
              <h3>I. SUMPTUOUS LEATHERS</h3>
              <p>Sourced from high-altitude alpine pastures, our hides are processed to retain natural suppleness.</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE CLOSING CTA */}
        <section className="closing-section">
          <h2 className="closing-title">Make it Yours.</h2>
          <button className="secondary-cta">REQUEST PRIVATE CONSULTATION</button>
          <div className="bg-text">BESPOKE</div>
        </section>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@100;300;600&display=swap');

        .bespoke-root { background-color: #050505; color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .config-hero { display: flex; height: 100vh; width: 100vw; overflow: hidden; }
        .info-panel { flex: 0 0 45%; display: flex; flex-direction: column; justify-content: center; padding: 100px 6% 0 8%; position: relative; z-index: 10; }
        .bespoke-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 400; line-height: 0.9; margin-bottom: 30px; }
        .line-accent { width: 60px; height: 1px; background: #c5b358; margin-bottom: 30px; }
        .bespoke-desc { font-size: 14px; line-height: 2; opacity: 0.5; max-width: 380px; margin-bottom: 50px; }
        .ui-label { font-size: 9px; letter-spacing: 5px; opacity: 0.4; margin-bottom: 25px; text-transform: uppercase; }
        .ui-label.center { text-align: center; margin-bottom: 40px; }
        .swatch-grid { display: flex; gap: 15px; }
        .swatch-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); position: relative; transition: transform 0.4s ease; cursor: pointer; }
        .swatch-btn.active { border: 2px solid #fff; transform: scale(1.1); }
        .selected-name-label { margin-top: 20px; font-size: 11px; letter-spacing: 3px; opacity: 0.8; }
        .primary-cta { margin-top: 60px; width: fit-content; padding: 20px 50px; background: #fff; color: #000; border: none; font-size: 10px; letter-spacing: 4px; font-weight: 600; transition: 0.4s; cursor: pointer; }
        .primary-cta:hover { background: #c5b358; color: #fff; transform: translateY(-5px); }
        .visual-viewport { flex: 1; position: relative; background: #000; }
        .image-layer { width: 100%; height: 100%; transition: opacity 0.6s ease, filter 0.6s ease; }
        .image-layer.is-syncing { opacity: 0; filter: blur(20px); }
        .car-image { width: 100%; height: 100%; object-fit: cover; }
        .edge-vignette { position: absolute; inset: 0; background: linear-gradient(to right, #050505 0%, transparent 40%); z-index: 2; }
        .manifesto-section { padding: 180px 10%; background: #080808; }
        .manifesto-text { font-family: 'Playfair Display', serif; font-size: clamp(1.5rem, 3.5vw, 2.8rem); font-weight: 400; line-height: 1.5; max-width: 950px; margin: 0 auto; text-align: center; font-style: italic; }
        .archive-section { padding: 120px 6%; }
        .archive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 60px; }
        .archive-card h3 { font-size: 12px; letter-spacing: 4px; margin: 30px 0 15px; }
        .archive-card p { font-size: 14px; opacity: 0.4; line-height: 2; font-weight: 300; }
        .closing-section { height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden; }
        .closing-title { font-family: 'Playfair Display', serif; font-size: 4rem; margin-bottom: 40px; z-index: 2; }
        .secondary-cta { padding: 22px 60px; background: none; border: 1px solid #fff; color: #fff; letter-spacing: 5px; font-size: 11px; transition: 0.4s; z-index: 2; cursor: pointer; }
        .secondary-cta:hover { background: #fff; color: #000; }
        .bg-text { position: absolute; font-size: 25vw; font-weight: 900; opacity: 0.02; letter-spacing: 2vw; pointer-events: none; }

        @media (max-width: 1100px) {
          .config-hero { flex-direction: column; height: auto; }
          .info-panel { flex: 1; padding: 150px 10% 80px; }
          .visual-viewport { height: 60vh; }
          .archive-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}