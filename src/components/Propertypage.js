import React, { useState, useEffect, useRef } from 'react';
import './Propertypage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance'; // Use your existing axios instance

// Helper function to decode JWT token (keep existing)
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

// Helper function to get user info (keep existing)
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
  
  // Fallback: Get from JWT (keep existing logic)
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('jwt');
    if (!token) {
      localStorage.removeItem('user');
      return null;
    }
    
    const decoded = decodeJWTToken(token);
    if (!decoded) {
      localStorage.removeItem('token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      return null;
    }
    
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
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
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    return null;
  }
};

// Expandable Description Component (RECOMMENDED FEATURE)
const ExpandableDescription = ({ description, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!description) return null;
  
  const shouldTruncate = description.length > maxLength;
  const displayText = isExpanded || !shouldTruncate 
    ? description 
    : description.substring(0, maxLength) + '...';

  return (
    <div className="property-description-section">
      <h4>Description</h4>
      <div className="description-content">
        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
          {displayText}
        </p>
        {shouldTruncate && (
          <button 
            className="read-more-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less ▲' : 'Read More ▼'}
          </button>
        )}
      </div>
    </div>
  );
};

// Property Features Component
const PropertyFeatures = ({ features, amenities }) => {
  if ((!features || features.length === 0) && (!amenities || amenities.length === 0)) {
    return null;
  }

  const allFeatures = [...(features || []), ...(amenities || [])];

  return (
    <div className="property-features">
      <h5>Features & Amenities</h5>
      <div className="features-list">
        {allFeatures.slice(0, 4).map((feature, index) => (
          <span key={index} className="feature-tag">
            {feature.replace(/_/g, ' ')}
          </span>
        ))}
        {allFeatures.length > 4 && (
          <span className="more-features">
            +{allFeatures.length - 4} more features
          </span>
        )}
      </div>
    </div>
  );
};

const PropertyList = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]); // Changed from filteredProperties
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    tower: 'All',
    bhk: 'All',
    status: 'All',
    maxPrice: 20000000,
  });
  
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [error, setError] = useState('');
  
  const priceRangeRef = useRef(null);
  const filtersRef = useRef(null);

  // Filter options based on actual API data
  const filterOptions = {
    tower: ['All'],
    bhk: ['All', '1', '2', '3', '4', '4+'],
    status: ['All', 'PUBLISHED', 'DRAFT', 'SOLD'],
  };

  // Authentication logic (keep existing)
  useEffect(() => {
    const userInfo = getUser();
    setUser(userInfo);

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

    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'authToken' || e.key === 'jwt' || e.key === 'user') {
        const currentUser = getUser();
        setUser(currentUser);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch properties from your API
        const response = await axios.get('/service-provider/properties/all');
        const propertiesData = response.data || [];
        
        setProperties(propertiesData);
        
        // Update filter options based on actual data
        const towers = [...new Set(propertiesData.map(p => p.tower).filter(Boolean))];
        filterOptions.tower = ['All', ...towers];
        
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on current filters
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
      let result = properties;
      
      if (filters.tower !== 'All') {
        result = result.filter(p => p.tower === filters.tower);
      }
      
      if (filters.bhk !== 'All') {
        const bhkNumber = filters.bhk === '4+' ? '4BHK+' : `${filters.bhk}BHK`;
        result = result.filter(p => p.bhkConfiguration === bhkNumber);
      }
      
      if (filters.status !== 'All') {
        result = result.filter(p => p.status === filters.status);
      }
      
      result = result.filter(p => (p.salePrice || 0) <= filters.maxPrice);
      
      setFilteredProperties(result);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, properties]);

  // Handler functions (keep existing)
  const handleFilterSelect = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setOpenDropdown(null);
  };

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
    if (phone) {
      window.open(`tel:${phone}`, '_self'); 
    } else {
      alert('Contact information not available');
    }
  };
  
  const handleViewDetails = (property) => { 
    navigate(`/property/${property.id}`, { state: { property } }); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Format price helper
  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    }
    return `₹${(price / 100000).toFixed(1)} L`;
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

      <nav className="breadcrumb">
        <Link to="/">🏠 Home</Link> &gt; <span>🏘️ Properties ({filteredProperties.length})</span>
      </nav>
      <h2 className="page-heading">🏘️ Available Properties</h2>

      {/* Filters UI (keep existing structure) */}
      <div className="filters-container" ref={filtersRef}>
        <div className="filters-header">
          <h4>Filter Properties</h4>
          <button onClick={clearFilters} className="clear-filters-btn">Clear All</button>
        </div>
        
        <div className="filter-controls">
          {/* Tower Filter */}
          <div className="filter-dropdown-group">
            <button onClick={() => toggleDropdown('tower')} className="filter-main-btn">
              <span>🏢 Tower: <strong>{filters.tower}</strong></span>
              <span className="dropdown-caret">▼</span>
            </button>
            {openDropdown === 'tower' && (
              <div className="dropdown-menu">
                {filterOptions.tower.map(opt => (
                  <div key={opt} onClick={() => handleFilterSelect('tower', opt)} className={`dropdown-item ${filters.tower === opt ? 'selected' : ''}`}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BHK Filter */}
          <div className="filter-dropdown-group">
            <button onClick={() => toggleDropdown('bhk')} className="filter-main-btn">
              <span>🛏️ BHK: <strong>{filters.bhk === 'All' ? 'All' : `${filters.bhk} BHK`}</strong></span>
              <span className="dropdown-caret">▼</span>
            </button>
            {openDropdown === 'bhk' && (
              <div className="dropdown-menu">
                {filterOptions.bhk.map(opt => (
                  <div key={opt} onClick={() => handleFilterSelect('bhk', opt)} className={`dropdown-item ${filters.bhk === opt ? 'selected' : ''}`}>
                    {opt === 'All' ? 'All' : `${opt} BHK`}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="filter-dropdown-group">
            <button onClick={() => toggleDropdown('status')} className="filter-main-btn">
              <span>🏷️ Status: <strong>{filters.status}</strong></span>
              <span className="dropdown-caret">▼</span>
            </button>
            {openDropdown === 'status' && (
              <div className="dropdown-menu">
                {filterOptions.status.map(opt => (
                  <div key={opt} onClick={() => handleFilterSelect('status', opt)} className={`dropdown-item ${filters.status === opt ? 'selected' : ''}`}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="filter-group price-filter">
          <label htmlFor="maxPrice">💰 Max Price: {formatPrice(filters.maxPrice)}</label>
          <input 
            ref={priceRangeRef} 
            type="range" 
            name="maxPrice" 
            id="maxPrice" 
            min="1000000" 
            max="50000000" 
            step="500000" 
            value={filters.maxPrice} 
            onChange={handlePriceChange} 
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {/* Property List */}
      <div className="property-list">
        {loading ? (
          <div className="loading-spinner">
            <div>🔄 Loading properties...</div>
          </div>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="image-container">
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={property.images[0].url} 
                    alt={property.title}
                    className="property-logo" 
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = 'https://placehold.co/300x200/EFEFEF/AAAAAA&text=No+Image'; 
                    }} 
                  />
                ) : (
                  <div className="no-image">🏠 No Image Available</div>
                )}
                
                <button className="favorite-btn" onClick={() => toggleFavorite(property.id)}>
                  {favorites.includes(property.id) ? '❤️' : '🤍'}
                </button>
                
                {property.images && property.images.length > 1 && (
                  <div className="image-count">+{property.images.length - 1} more</div>
                )}
              </div>
              
              <div className="property-info">
                <h3>{property.title}</h3>
                
                <div className="property-stats">
                  <span className="views">👁️ {property.viewCount || 0} views</span>
                  <span className="date">📅 {new Date(property.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}</span>
                </div>

                {/* EXPANDABLE DESCRIPTION - KEY FEATURE */}
                <ExpandableDescription description={property.description} maxLength={120} />
                
                <div className="property-meta">
                  <span><strong>{property.bhkConfiguration}</strong></span>
                  <span>Tower <strong>{property.tower}</strong></span>
                  <span><strong>{property.builtUpArea}</strong> sq ft</span>
                  <span className={`status ${(property.status || '').toLowerCase()}`}>
                    {property.status || 'Available'}
                  </span>
                </div>

                {/* Property Features */}
                <PropertyFeatures 
                  features={property.interiorFeatures} 
                  amenities={property.buildingAmenities} 
                />
                
                <div className="property-price-section">
                  <p className="property-price">{formatPrice(property.salePrice)}</p>
                  {property.monthlyMaintenance && (
                    <p className="maintenance">₹{property.monthlyMaintenance}/month maintenance</p>
                  )}
                </div>
                
                <div className="action-buttons">
                  <button className="view-btn" onClick={() => handleViewDetails(property)}>
                    View Details
                  </button>
                  <button 
                    className="contact-btn" 
                    onClick={() => handleContactAgent(property.contactPreferences?.primaryContact)}
                    disabled={property.status === 'SOLD'}
                  >
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results-message">
            <h3>😔 No properties match your criteria.</h3>
            <p>Try adjusting your filters or check back later for new listings.</p>
          </div>
        )}
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="back-to-top-btn"
      >
        🔝
      </button>
    </div>
  );
};

export default PropertyList;
