import React from 'react';

export default function Home() {
  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      {/* HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1631215106441-0775d0b9875e?auto=format&fit=crop&q=100&w=2500")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '6%',
          zIndex: 2
        }}>
          <h1 style={{ 
            fontSize: 'clamp(4rem, 15vw, 12rem)', 
            fontWeight: '300', 
            margin: 0, 
            letterSpacing: '-5px',
            lineHeight: 0.8
          }}>
            Inspiring <br /> <span style={{ fontStyle: 'italic', paddingLeft: '50px' }}>Greatness</span>
          </h1>
          <p style={{ 
            marginTop: '40px', 
            letterSpacing: '12px', 
            fontSize: '12px', 
            opacity: 0.7, 
            textTransform: 'uppercase' 
          }}>
            The Future of Electrified Luxury
          </p>
        </div>
      </section>

      {/* SECONDARY EDITORIAL SECTION */}
      <section style={{ padding: '200px 15%', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '11px', 
          letterSpacing: '10px', 
          opacity: 0.4, 
          marginBottom: '50px' 
        }}>PHILOSOPHY</h2>
        <p style={{ 
          fontSize: '2.5rem', 
          lineHeight: '1.4', 
          fontWeight: '300', 
          fontFamily: 'serif',
          color: '#eee'
        }}>
          "Strive for perfection in everything you do. Take the best that exists and make it better. When it does not exist, design it."
        </p>
        <div style={{ marginTop: '60px', width: '1px', height: '100px', backgroundColor: 'white', margin: '60px auto' }} />
      </section>
    </div>
  );
}