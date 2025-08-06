import React from 'react';
import './RestaurantList.css'; // Reuse same CSS for layout
import { Link } from 'react-router-dom';

const salons = [
  {
    name: 'Style Studio',
    rating: 4.3,
    desc: 'Unisex salon with expert stylists',
    status: 'Open',
    logo: 'salon1.jpeg'
  },
  {
    name: 'Glam & Glow',
    rating: 4.6,
    desc: 'Beauty and grooming services',
    status: 'Closed',
    logo: 'salon2.jpeg'
  },
  {
    name: 'Hair & There',
    rating: 4.1,
    desc: 'Trendy hairstyles & beard trims',
    status: 'Open',
    logo: 'salon3.jpeg'
  },
  {
    name: "The Cut Studio",
    rating: 4.5,
    desc: 'Salon experience redefined',
    status: 'Open',
    logo: 'salon4.jpeg'
  }
];

const SalonList = () => {
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
        <Link to="/">Home</Link> &gt; <span>Salons</span>
      </nav>

      <h2 className="restaurant-heading">Salons</h2>

      <div className="restaurant-list">
        {salons.map((s, index) => (
          <div key={index} className="restaurant-card">
            <img src={`/images/${s.logo}`} alt={s.name} className="restaurant-logo" />
            <div className="restaurant-info">
              <h3>{s.name}</h3>
              <div className="rating">⭐ {s.rating}</div>
              <p>{s.desc}</p>
              <span className={`status ${s.status.toLowerCase()}`}>{s.status}</span>
            </div>
            <button className="view-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalonList;
