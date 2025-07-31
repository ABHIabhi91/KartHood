import React from 'react';
import './RestaurantList.css';
import { Link } from 'react-router-dom';

const properties = [
  {
    name: 'Sunrise Apartments',
    rating: 4.5,
    desc: '2BHK luxury apartments with modern amenities',
    status: 'Available',
    logo: 'property1.jpeg'
  },
  {
    name: 'Green Valley Homes',
    rating: 4.3,
    desc: '3BHK independent houses with garden',
    status: 'Sold',
    logo: 'property2.jpeg'
  },
  {
    name: 'Skyline Towers',
    rating: 4.6,
    desc: 'High-rise apartments with city view',
    status: 'Available',
    logo: 'property3.jpeg'
  },
  {
    name: 'Royal Residency',
    rating: 4.4,
    desc: 'Premium villas with swimming pool',
    status: 'Available',
    logo: 'property4.jpeg'
  }
];

const PropertyList = () => {
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
        <Link to="/">Home</Link> &gt; <span>Properties</span>
      </nav>

      <h2 className="restaurant-heading">Properties</h2>

      <div className="restaurant-list">
        {properties.map((p, index) => (
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

export default PropertyList;