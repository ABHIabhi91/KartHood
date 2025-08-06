import React from 'react';
import './RestaurantList.css';
import { Link } from 'react-router-dom';

const bakeries = [
  {
    name: 'Sweet Crumbs',
    rating: 4.4,
    desc: 'Freshly baked pastries & cakes',
    status: 'Open',
    logo: 'bakery1.jpeg'
  },
  {
    name: 'Bread & Butter',
    rating: 4.1,
    desc: 'Bread, buns & more',
    status: 'Closed',
    logo: 'bakery2.jpeg'
  },
  {
    name: 'Cake Corner',
    rating: 4.6,
    desc: 'Custom cakes for all occasions',
    status: 'Open',
    logo: 'bakery3.jpeg'
  },
  {
    name: 'The Bake House',
    rating: 4.3,
    desc: 'Artisan baked goods',
    status: 'Open',
    logo: 'bakery4.jpeg'
  }
];

const BakeryList = () => {
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
        <Link to="/">Home</Link> &gt; <span>Bakeries</span>
      </nav>

      <h2 className="restaurant-heading">Bakeries</h2>

      <div className="restaurant-list">
        {bakeries.map((b, index) => (
          <div key={index} className="restaurant-card">
            <div className="image-container">
              <img src={`/images/${b.logo}`} alt={b.name} className="restaurant-logo" />
            </div>
            <div className="restaurant-info">
              <h3>{b.name}</h3>
              <div className="rating">⭐ {b.rating}</div>
              <p>{b.desc}</p>
              <span className={`status ${b.status.toLowerCase()}`}>{b.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BakeryList;
