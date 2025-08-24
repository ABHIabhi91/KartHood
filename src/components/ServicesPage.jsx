import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => setIsLoaded(true), []);

  const services = [
    {
      id: 'properties',
      name: 'Properties',
      desc: 'Complete property management for owners & tenants.',
      icon: '🏢',
      to: '/services/properties',
      stat: '50+ Listings'
    },
    {
      id: 'restaurants',
      name: 'Restaurants',
      desc: 'Menus, orders and analytics for food outlets.',
      icon: '🍽️',
      to: '/services/restaurants',
      stat: '20+ Partners'
    },
    {
      id: 'bakeries',
      name: 'Bakeries',
      desc: 'Recipe scaling, order queues & stock tracking.',
      icon: '🧁',
      to: '/services/bakeries',
      stat: '15+ Bakeries'
    },
    {
      id: 'salons',
      name: 'Salons',
      desc: 'Bookings, staff rosters & client records in one place.',
      icon: '✂️',
      to: '/services/salons',
      stat: '10+ Salons'
    }
  ];

  return (
    <div className={`services-wrapper ${isLoaded ? 'loaded' : ''}`}>
      {/* ── Top Nav (re-uses landing page styling) ────────────────────────── */}
      <header className="login-bar">
        <h1>🏪 Kart Hood</h1>
        <button className="login-btn" onClick={() => navigate('/')}>🏠 Home</button>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="services-hero">
        <h1 className="services-title">Our Services</h1>
        <p className="services-sub">
          End-to-end solutions that help your neighbourhood thrive.
        </p>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <section className="services-grid">
        {services.map((srv, i) => (
          <article
            key={srv.id}
            className={`service-card ${hovered === srv.id ? 'hovered' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
            onMouseEnter={() => setHovered(srv.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(srv.to)}
            role="button"
            tabIndex={0}
          >
            <div className="service-badge">{srv.stat}</div>

            <div className="service-icon" aria-hidden>
              {srv.icon}
            </div>

            <h3>{srv.name}</h3>
            <p>{srv.desc}</p>

            
          </article>
        ))}
      </section>

      {/* ── Footer (same component styling as landing page) ──────────────── */}
      <footer className="features-section footer-section">
        <h2 className="section-title">🚀 Why work with us?</h2>
        <div className="features-grid">
          {[
            { icon: '⚡', title: 'Fast On-boarding', desc: 'Get started in minutes.' },
            { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade protection.' },
            { icon: '📊', title: 'Insightful', desc: 'Actionable analytics 24/7.' },
            { icon: '🤝', title: 'Community', desc: 'Built for neighbours by neighbours.' }
          ].map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
