import React from 'react';
import './RestaurantList.css';
import { Link } from 'react-router-dom';

const parlours = [
  {
    name: 'Elegance Beauty Parlour',
    rating: 4.5,
    desc: 'Luxury facials & skin treatments',
    status: 'Open',
    logo: 'parlour1.jpeg'
  },
  {
    name: 'Glow Up Studio',
    rating: 4.3,
    desc: 'Makeup & hair styling experts',
    status: 'Closed',
    logo: 'parlour2.jpeg'
  },
  {
    name: 'Radiance Touch',
    rating: 4.6,
    desc: 'Spa and wellness center',
    status: 'Open',
    logo: 'parlour3.jpeg'
  },
  {
    name: 'The Beauty Room',
    rating: 4.4,
    desc: 'All-in-one grooming services',
    status: 'Open',
    logo: 'parlour4.jpeg'
  }
];

const BeautyParlourList = () => {
  return (
    <div className="restaurant-page">
      <header className="topbar">
        <div className="logo">
          <span className="gls">GLS</span> <span className="aravali">ARAVALI</span> <span className="homes">HOMES</span>
        </div>
        <div className="menu-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>

      <nav className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>Beauty Parlours</span>
      </nav>

      <h2 className="restaurant-heading">Beauty Parlours</h2>

      <div className="restaurant-list">
        {parlours.map((p, index) => (
          <div key={index} className="restaurant-card">
            <div className="image-container">
              <img src={`/images/${p.logo}`} alt={p.name} className="restaurant-logo" />
            </div>
            <div className="restaurant-info">
              <h3>{p.name}</h3>
              <div className="rating">⭐ {p.rating}</div>
              <p>{p.desc}</p>
              <span className={`status ${p.status.toLowerCase()}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeautyParlourList;
