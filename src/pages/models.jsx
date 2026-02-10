import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MODELS_COLLECTION = [
  {
    id: "01",
    name: "PHANTOM",
    series: "MAGNUM OPUS",
    quote: "A sanctuary for the mind.",
    video: "/images/bughatti.mp4", // Path to your video file
    details: "The most recognizable silhouette in the world. Reimagined with a laser-cut grille and starlight headlights.",
    path: "/bespoke",
    specs: ["6.75L V12", "563 BHP", "900 NM"]
  },
  {
    id: "02",
    name: "SPECTRE",
    series: "L'AVENIR",
    quote: "Silence is the ultimate luxury.",
    video: "/images/dodge.mp4", // Your BMW video
    details: "The electric prophecy fulfilled. A spiritual successor to the Phantom Coupé, built for the future.",
    path: "/gallery",
    specs: ["Electric", "584 BHP", "900 NM"]
  },
  {
    id: "03",
    name: "CULLINAN",
    series: "BLACK BADGE",
    quote: "The earth is yours.",
    video: "/images/porche.mp4", // Path to your video file
    details: "Effortless, everywhere. The absolute peak of all-terrain luxury, refined for those who lead.",
    path: "/bespoke",
    specs: ["6.75L V12", "600 BHP", "900 NM"]
  }
];

export default function Models() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', overflowX: 'hidden' }}>
      
      {/* 1. ANIMATED HERO: THE STATEMENT */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 5%' 
      }}>
        <div style={{ 
          position: 'absolute', 
          transform: `translateY(${scrollY * 0.5}px)`, // Parallax
          fontSize: '25vw', 
          fontWeight: '900', 
          opacity: 0.03, 
          letterSpacing: '-1.5vw',
          whiteSpace: 'nowrap',
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'transform 0.1s linear'
        }}>
          PERFECTION
        </div>
        
        <div style={{ zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: 'clamp(10px, 1vw, 14px)', 
            letterSpacing: 'clamp(10px, 1.5vw, 20px)', 
            opacity: 0.4, 
            marginBottom: '20px',
            animation: 'fadeInUp 1.5s ease'
          }}>
            THE 2026 COLLECTION
          </h2>
          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 10vw, 12rem)', 
            fontWeight: '200', 
            fontFamily: 'serif', 
            margin: 0, 
            fontStyle: 'italic',
            lineHeight: 0.9,
            animation: 'fadeInUp 2s ease'
          }}>
            The Pantheon
          </h1>
        </div>
      </section>

      {/* 2. THE MODELS EXHIBITION */}
      {MODELS_COLLECTION.map((car, index) => (
        <section key={car.id} style={{ 
          minHeight: '150vh', 
          padding: '0 5%', 
          position: 'relative',
          marginBottom: '10vh'
        }}>
          
          {/* STICKY DATA */}
          <div style={{ 
            position: 'sticky', 
            top: '12%', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            zIndex: 10,
            paddingBottom: '2vh'
          }}>
            <div style={{ animation: 'fadeInLeft 1s ease' }}>
               <h3 style={{ fontSize: 'clamp(10px, 0.8vw, 12px)', letterSpacing: '5px', opacity: 0.4, marginBottom: '5px' }}>{car.series}</h3>
               <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)', fontWeight: '200', margin: 0, letterSpacing: '8px' }}>{car.name}</h2>
            </div>
            
            <button 
              onClick={() => navigate(car.path)}
              className="luxury-button-outline"
              style={{ 
                background: 'none', border: 'none', color: '#fff', fontSize: 'clamp(9px, 0.7vw, 11px)', 
                letterSpacing: '4px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.3)', 
                paddingBottom: '8px', marginTop: '30px', transition: 'all 0.4s ease'
              }}
            >
              EXPLORE
            </button>
          </div>

          {/* PARALLAX VIDEO WINDOW */}
          <div style={{ 
            width: '100%', 
            height: 'clamp(400px, 80vh, 900px)', 
            backgroundColor: '#0a0a0a', 
            overflow: 'hidden',
            position: 'relative',
            marginTop: '5vh'
          }}>
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
                transform: `scale(${1 + (scrollY * 0.0001)})` // Maintaining your scale effect
              }} 
            >
              <source src={car.video} type="video/mp4" />
            </video>
          </div>

          {/* RESPONSIVE EDITORIAL CARD */}
          <div style={{ 
            display: 'flex', 
            marginTop: '5vh', 
            justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
            paddingBottom: '10vh'
          }}>
            <div style={{ 
              width: '100%',
              maxWidth: 'clamp(300px, 40vw, 600px)', 
              padding: 'clamp(30px, 5vw, 80px)', 
              backgroundColor: 'rgba(5, 5, 5, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.05)',
              zIndex: 5
            }}>
              <p style={{ fontSize: 'clamp(1.2rem, 2vw, 2rem)', fontFamily: 'serif', fontStyle: 'italic', marginBottom: '30px' }}>
                "{car.quote}"
              </p>
              <p style={{ fontSize: 'clamp(13px, 1vw, 15px)', lineHeight: '1.8', opacity: 0.5, marginBottom: '40px' }}>
                {car.details}
              </p>
              
              {/* SPECS GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '40px' }}>
                {car.specs.map(spec => (
                  <div key={spec}>
                    <p style={{ fontSize: 'clamp(12px, 1.2vw, 16px)', fontWeight: '300' }}>{spec}</p>
                    <div style={{ width: '15px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', marginTop: '8px' }} />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => navigate('/bespoke')}
                  style={{ flex: '1 1 150px', padding: '18px', background: '#fff', color: '#000', border: 'none', fontSize: '10px', letterSpacing: '2px', fontWeight: '700', cursor: 'pointer', transition: '0.3s' }}
                >
                  BESPOKE
                </button>
                <button 
                  onClick={() => navigate('/gallery')}
                  style={{ flex: '1 1 150px', padding: '18px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontSize: '10px', letterSpacing: '2px', cursor: 'pointer', transition: '0.3s' }}
                >
                  GALLERY
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* 3. RESPONSIVE CTA */}
      <section style={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        padding: '0 5%'
      }}>
        <div style={{ width: '1px', height: '15vh', background: 'linear-gradient(to bottom, transparent, #fff)', marginBottom: '40px' }} />
        <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)', fontWeight: '100', fontFamily: 'serif', maxWidth: '800px' }}>
          Every Great Journey Starts With A Whisper.
        </h3>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            marginTop: '40px', padding: '20px 50px', background: 'none', border: '1px solid rgba(255,255,255,0.3)', 
            color: '#fff', letterSpacing: '5px', fontSize: '11px', cursor: 'pointer', transition: 'all 0.5s'
          }}
        >
          RETURN HOME
        </button>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .luxury-button-outline:hover {
          opacity: 1 !important;
          border-bottom: 1px solid #fff !important;
          letter-spacing: 6px !important;
        }
      `}</style>

    </div>
  );
}