import React, { useState, useEffect, useRef } from 'react';
import './Propertypage.css';
import { Link, useNavigate } from 'react-router-dom';

// Data and filter options remain the same
const propertiesData = [
  { id: 1, name: 'Sunrise Apartments', rating: 4.5, desc: '2BHK luxury apartments', status: 'Available', logo: 'property1.jpeg', tower: 'A', bhk: 2, price: 7500000, agentPhone: '9876543210' },
  { id: 2, name: 'Green Valley Homes', rating: 4.3, desc: '3BHK independent houses', status: 'Sold', logo: 'property2.jpeg', tower: 'Villa', bhk: 3, price: 12000000, agentPhone: '9876543211' },
  { id: 3, name: 'Skyline Towers', rating: 4.6, desc: 'High-rise apartments', status: 'Available', logo: 'property3.jpeg', tower: 'B', bhk: 3, price: 9500000, agentPhone: '9876543212' },
  { id: 4, name: 'Royal Residency', rating: 4.4, desc: 'Premium villas with pool', status: 'Available', logo: 'property4.jpeg', tower: 'Villa', bhk: 4, price: 15000000, agentPhone: '9876543213' },
  { id: 5, name: 'Orchid Heights', rating: 4.7, desc: 'Spacious 2BHK flats', status: 'Available', logo: 'property5.jpeg', tower: 'A', bhk: 2, price: 8000000, agentPhone: '9876543214' },
  { id: 6, name: 'Metropolis Lofts', rating: 4.2, desc: 'Modern 1BHK studios', status: 'Available', logo: 'property6.jpeg', tower: 'C', bhk: 1, price: 5000000, agentPhone: '9876543215' },
];

const filterOptions = {
    tower: ['All', 'A', 'B', 'C', 'Villa'],
    bhk: ['All', '1', '2', '3', '4'],
    status: ['All', 'Available', 'Sold'],
};

// Helper function to decode JWT token
const decodeJWTToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token format');
    }
    
    const payload = parts[1];
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    const decodedPayload = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));
    
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

// Helper function to get user info from localStorage - IMPROVED VERSION
const getUser = () => {
  try {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const userObj = JSON.parse(localUser);
      if (userObj && (userObj.name || userObj.username || userObj.email)) {
        return {
          name: userObj.name,
          username: userObj.username || userObj.email,
          tower: userObj.tower,
          flatNo: userObj.flatNo || userObj.flatNumber,
          id: userObj.id,
          email: userObj.email,
        };
      }
    }
  } catch {}
  
  // Fallback: Get from JWT
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('jwt');
    if (!token) {
      // Clear any stale user data
      localStorage.removeItem('user');
      return null;
    }
    
    const decoded = decodeJWTToken(token);
    if (!decoded) {
      // Clear invalid token and user data
      localStorage.removeItem('token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      return null;
    }
    
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      // Token expired - clear everything
      localStorage.removeItem('token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      return null;
    }
    
    return {
      name: decoded.name,
      username: decoded.username || decoded.name || decoded.user || decoded.sub,
      tower: decoded.tower || decoded.towerNumber || decoded.building,
      flatNo: decoded.flatNo || decoded.flatNumber || decoded.apartment || decoded.unit,
      id: decoded.id || decoded.userId,
      email: decoded.email || decoded.sub,
    };
  } catch (err) {
    // Clear everything on error
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    return null;
  }
};

const PropertyList = () => {
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);
  const [filters, setFilters] = useState({
    tower: 'All',
    bhk: 'All',
    status: 'All',
    maxPrice: 20000000,
  });
  
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  // Updated user state to get from JWT token
  const [user, setUser] = useState(null);

  // State to manage which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null); 
  const priceRangeRef = useRef(null);
  const filtersRef = useRef(null);

  // IMPROVED AUTHENTICATION LOGIC - Same as RestaurantList
  useEffect(() => {
    const userInfo = getUser();
    setUser(userInfo);

    // Re-check user info when page becomes visible or focused
    const handleFocus = () => {
      const currentUser = getUser();
      setUser(currentUser);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const currentUser = getUser();
        setUser(currentUser);
      }
    };

    // Listen to various events that might indicate user should be re-validated
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen to storage changes (in case user logs out from another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'authToken' || e.key === 'jwt' || e.key === 'user') {
        const currentUser = getUser();
        setUser(currentUser);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Additional effect to re-check user on any route navigation
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, [navigate]);

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (filtersRef.current && !filtersRef.current.contains(event.target)) {
            setOpenDropdown(null);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
        let result = propertiesData;
        if (filters.tower !== 'All') result = result.filter(p => p.tower === filters.tower);
        if (filters.bhk !== 'All') result = result.filter(p => p.bhk === parseInt(filters.bhk));
        if (filters.status !== 'All') result = result.filter(p => p.status === filters.status);
        result = result.filter(p => p.price <= filters.maxPrice);
        setFilteredProperties(result);
        setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);
  
  // Handler to select an item from a dropdown
  const handleFilterSelect = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setOpenDropdown(null); // Close dropdown after selection
  };

  // Handler to toggle a dropdown open/closed
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(prev => (prev === dropdownName ? null : dropdownName));
  };
  
  const handlePriceChange = (e) => {
    const { name, value, min, max } = e.target;
    const percentage = ((value - min) / (max - min)) * 100;
    e.target.style.setProperty('--slider-percentage', `${percentage}%`);
    setFilters(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const clearFilters = () => {
    setFilters({ tower: 'All', bhk: 'All', status: 'All', maxPrice: 20000000 });
    if (priceRangeRef.current) {
        priceRangeRef.current.style.setProperty('--slider-percentage', `100%`);
    }
  };

  const toggleFavorite = (propertyId) => { 
    setFavorites(prev => prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]); 
  };
  
  const handleContactAgent = (phone) => { 
    window.open(`tel:${phone}`, '_self'); 
  };
  
  const handleViewDetails = (property) => { 
    navigate(`/property/${property.id}`, { state: { property } }); 
  };

  // IMPROVED LOGOUT FUNCTION - Same as RestaurantList
  const handleLogout = () => {
    // Clear all possible token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    
    // Immediately update state
    setUser(null);
    
    // Navigate to home
    navigate('/');
  };
  
  return (
    <div className="property-page">
      <header className="topbar">
        <div className="logo" onClick={() => navigate('/')}>
          <span className="gls">GLS</span> <span className="aravali">ARAVALI</span> <span className="homes">HOMES</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span className="welcome-msg">
                Hi, <strong>{user.name}</strong> 👋
                {user.tower && user.flatNo && (
                  <span style={{ fontSize: '0.9em', color: '#666', marginLeft: '8px' }}>
                    Tower {user.tower}, Flat {user.flatNo}
                  </span>
                )}
              </span>
              <button className="login-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
              <button className="login-btn" onClick={() => navigate('/register-resident')}>Sign Up</button>
            </>
          )}
        </div>
      </header>

      <nav className="breadcrumb"><Link to="/">🏠 Home</Link> &gt; <span>🏘️ Properties</span></nav>
      <h2 className="page-heading">🏘️ Properties</h2>

      {/* Filters UI with dropdown buttons */}
      <div className="filters-container" ref={filtersRef}>
        <div className="filters-header">
            <h4>Filter Properties</h4>
            <button onClick={clearFilters} className="clear-filters-btn">Clear All</button>
        </div>
        
        <div className="filter-controls">
            {/* Tower Filter Dropdown */}
            <div className="filter-dropdown-group">
                <button onClick={() => toggleDropdown('tower')} className="filter-main-btn">
                    <span>🏢 Tower: <strong>{filters.tower}</strong></span>
                    <span className="dropdown-caret">▼</span>
                </button>
                {openDropdown === 'tower' && (
                    <div className="dropdown-menu">
                        {filterOptions.tower.map(opt => (
                            <div key={opt} onClick={() => handleFilterSelect('tower', opt)} className={`dropdown-item ${filters.tower === opt ? 'selected' : ''}`}>{opt}</div>
                        ))}
                    </div>
                )}
            </div>

            {/* BHK Filter Dropdown */}
            <div className="filter-dropdown-group">
                <button onClick={() => toggleDropdown('bhk')} className="filter-main-btn">
                    <span>🛏️ BHK: <strong>{filters.bhk === 'All' ? 'All' : `${filters.bhk} BHK`}</strong></span>
                    <span className="dropdown-caret">▼</span>
                </button>
                {openDropdown === 'bhk' && (
                    <div className="dropdown-menu">
                        {filterOptions.bhk.map(opt => (
                            <div key={opt} onClick={() => handleFilterSelect('bhk', opt)} className={`dropdown-item ${filters.bhk === opt ? 'selected' : ''}`}>{opt === 'All' ? 'All' : `${opt} BHK`}</div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Filter Dropdown */}
            <div className="filter-dropdown-group">
                <button onClick={() => toggleDropdown('status')} className="filter-main-btn">
                    <span>🏷️ Status: <strong>{filters.status}</strong></span>
                    <span className="dropdown-caret">▼</span>
                </button>
                {openDropdown === 'status' && (
                    <div className="dropdown-menu">
                        {filterOptions.status.map(opt => (
                            <div key={opt} onClick={() => handleFilterSelect('status', opt)} className={`dropdown-item ${filters.status === opt ? 'selected' : ''}`}>{opt}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <div className="filter-group price-filter">
            <label htmlFor="maxPrice">💰 Max Price: ₹{new Intl.NumberFormat('en-IN').format(filters.maxPrice)}</label>
            <input ref={priceRangeRef} type="range" name="maxPrice" id="maxPrice" min="5000000" max="20000000" step="500000" value={filters.maxPrice} onChange={handlePriceChange} />
        </div>
      </div>

      <div className="property-list">
        {loading ? (
            <div className="loading-spinner"><div>🔄 Finding properties...</div></div>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <div key={p.id} className="property-card">
              <div className="image-container">
                <img src={`/images/${p.logo}`} alt={p.name} className="property-logo" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x200/EFEFEF/AAAAAA&text=No+Image'; }} />
                <button className="favorite-btn" onClick={() => toggleFavorite(p.id)}>
                    {favorites.includes(p.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="property-info">
                <h3>{p.name}</h3>
                <div className="rating">⭐ {p.rating}</div>
                <p className="property-desc">{p.desc}</p>
                <div className="property-meta">
                    <span><strong>{p.bhk} BHK</strong></span>
                    <span>Tower <strong>{p.tower}</strong></span>
                    <span className={`status ${p.status.toLowerCase()}`}>{p.status}</span>
                </div>
                <p className="property-price">₹{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(p.price)}</p>
                
                <div className="action-buttons">
                    <button className="view-btn" onClick={() => handleViewDetails(p)}>View Details</button>
                    <button className="contact-btn" onClick={() => handleContactAgent(p.agentPhone)} disabled={p.status === 'Sold'}>Contact Agent</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results-message">
            <h3>😔 No properties match your criteria.</h3><p>Try adjusting your filters.</p>
          </div>
        )}
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="back-to-top-btn">🔝</button>
    </div>
  );
};

export default PropertyList;
