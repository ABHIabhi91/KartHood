import React, { useState, useEffect } from 'react';
import './RestaurantList.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const restaurants = [
  {
    id: 1,
    name: 'Tasty Bites',
    rating: 4.5,
    reviewCount: 245,
    desc: 'Quick bites and takeaway',
    status: 'Open',
    logo: 'resturant1.jpeg',
    cuisine: 'Multi-cuisine',
    deliveryTime: '25-30 min',
    discount: '20% OFF',
    phone: '9876543210',
    address: 'Shop 12, CP1 Tower A',
    speciality: 'North Indian, Chinese',
    priceRange: '₹200-400'
  },
  {
    id: 2,
    name: 'Spice Symphony',
    rating: 4.0,
    reviewCount: 189,
    desc: 'A fine dining experience',
    status: 'Closed',
    logo: 'resturant2.jpeg',
    cuisine: 'Indian',
    deliveryTime: '35-40 min',
    discount: null,
    phone: '9876543211',
    address: 'Shop 8, CP1 Tower B',
    speciality: 'South Indian, Biryani',
    priceRange: '₹300-600'
  },
  {
    id: 3,
    name: 'Coders! Café',
    rating: 4.7,
    reviewCount: 320,
    desc: 'Café with a tech twist',
    status: 'Open',
    logo: 'resturant3.jpeg',
    cuisine: 'Continental',
    deliveryTime: '20-25 min',
    discount: '15% OFF',
    phone: '9876543212',
    address: 'Shop 3, CP1 Tower A',
    speciality: 'Coffee, Sandwiches',
    priceRange: '₹150-300'
  },
  {
    id: 4,
    name: "Foodie's Hub",
    rating: 4.2,
    reviewCount: 167,
    desc: 'Diverse culinary delights',
    status: 'Open',
    logo: 'resturant4.jpeg',
    cuisine: 'Multi-cuisine',
    deliveryTime: '30-35 min',
    discount: '25% OFF',
    phone: '9876543213',
    address: 'Shop 15, CP1 Tower C',
    speciality: 'Italian, Mexican',
    priceRange: '₹250-500'
  },
  {
    id: 5,
    name: 'Desi Flavors',
    rating: 4.3,
    reviewCount: 203,
    desc: 'Authentic Indian cuisine',
    status: 'Open',
    logo: 'resturant1.jpeg',
    cuisine: 'Indian',
    deliveryTime: '28-32 min',
    discount: '10% OFF',
    phone: '9876543214',
    address: 'Shop 7, CP1 Tower B',
    speciality: 'Punjabi, Rajasthani',
    priceRange: '₹200-450'
  },
  {
    id: 6,
    name: 'Pizza Palace',
    rating: 4.1,
    reviewCount: 156,
    desc: 'Wood-fired pizzas',
    status: 'Closed',
    logo: 'resturant2.jpeg',
    cuisine: 'Italian',
    deliveryTime: '25-30 min',
    discount: null,
    phone: '9876543215',
    address: 'Shop 20, CP1 Tower C',
    speciality: 'Pizza, Pasta',
    priceRange: '₹300-550'
  }
];

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

// INTEGRATED LOGIN COMPONENT
const LoginModal = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'Resident'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    const payload = formData;

    try {
      localStorage.removeItem('token');

      const response = await axios.post('/login', payload);

      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user || payload));

      // Call success callback to update parent component
      if (onLoginSuccess) {
        onLoginSuccess(response.data.user || payload);
      }
      
      // Close modal
      onClose();
    } catch (err) {
      console.error('Authentication error:', err);
      if (err.response && err.response.status === 401) {
        setLoginError('Credentials or User Type is incorrect');
      } else if (err.response && err.response.data && err.response.data.message) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="login-modal-container">
          <div className="logo" aria-label="Kart Hood logo">
            🏪 Kart Hood
          </div>
          <h2 className="welcome-text">Welcome Back!</h2>
          <p className="subtitle">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="login-form">
            {loginError && (
              <div className="error-message" role="alert">
                {loginError}
              </div>
            )}

            <div className="input-group" data-icon="📧" aria-label="Email input">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div className="input-group" data-icon="🔒" aria-label="Password input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="form-input password-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="user-type-group" role="radiogroup" aria-labelledby="user-type-label">
              <div className="radio-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="Resident"
                    checked={formData.userType === 'Resident'}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  🏠 Resident
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="Service Provider"
                    checked={formData.userType === 'Service Provider'}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  💼 Service Provider
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner" />
                  Signing In...
                </>
              ) : (
                '🔑 Sign In'
              )}
            </button>

            <div className="forgot-password">
              <a href="#" className="forgot-password-link">
                Forgot your password?
              </a>
            </div>
          </form>

          <div className="auth-links">
            <p>Don't have an account yet?</p>
            <div className="register-options">
              <button
                onClick={() => {
                  onClose();
                  navigate('/register-resident');
                }}
                className="register-button resident-register"
              >
                🏠 Register as Resident
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/register-service');
                }}
                className="register-button service-register"
              >
                💼 Join as Service Provider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RestaurantList = () => {
  const navigate = useNavigate();
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const filters = [
    { id: 'all', label: 'All Restaurants', count: restaurants.length },
    { id: 'open', label: 'Open Now', count: restaurants.filter(r => r.status === 'Open').length },
    { id: 'indian', label: 'Indian', count: restaurants.filter(r => r.cuisine === 'Indian').length },
    { id: 'multi-cuisine', label: 'Multi-cuisine', count: restaurants.filter(r => r.cuisine === 'Multi-cuisine').length },
    { id: 'discount', label: 'Offers', count: restaurants.filter(r => r.discount).length }
  ];

  // Effect to get user info from JWT token on component mount
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

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = restaurants;

      switch (activeFilter) {
        case 'open':
          filtered = restaurants.filter(r => r.status === 'Open');
          break;
        case 'indian':
          filtered = restaurants.filter(r => r.cuisine === 'Indian');
          break;
        case 'multi-cuisine':
          filtered = restaurants.filter(r => r.cuisine === 'Multi-cuisine');
          break;
        case 'discount':
          filtered = restaurants.filter(r => r.discount);
          break;
        default:
          filtered = restaurants;
      }

      setFilteredRestaurants(filtered);
      setLoading(false);
    }, 300);
  }, [activeFilter]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  const toggleFavorite = (restaurantId) => {
    setFavorites(prev => 
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleOrder = (restaurant) => {
    navigate(`/restaurant/${restaurant.id}/menu`, { state: { restaurant } });
  };

  const handleViewDetails = (restaurant) => {
    navigate(`/restaurant/${restaurant.id}`, { state: { restaurant } });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Handle successful login from modal
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div className="restaurant-page">
      <header className="topbar">
        <div className="logo" onClick={() => navigate('/')}>
          <span className="gls">GLS</span> 
          <span className="aravali">ARAVALI</span> 
          <span className="homes">HOMES</span>
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
              <button className="login-btn" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="login-btn" onClick={() => navigate('/register-resident')}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      <nav className="breadcrumb">
        <Link to="/">🏠 Home</Link> &gt; <span>🍽️ Restaurants</span>
      </nav>

      <h2 className="restaurant-heading">🍽️ Restaurants</h2>

      {/* Filter Section */}
      <div className="filter-section">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => handleFilterChange(filter.id)}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Restaurant List */}
      <div className="restaurant-list">
        {loading ? (
          <div className="loading-spinner">
            <div>🔄 Loading restaurants...</div>
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="no-results">
            <h3>😔 No restaurants found</h3>
            <p>Try adjusting your filters or check back later</p>
          </div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <div className="image-container">
                <img 
                  src={`/images/${restaurant.logo}`} 
                  alt={restaurant.name} 
                  className="restaurant-logo" 
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src='https://placehold.co/300x200/EFEFEF/AAAAAA&text=No+Image'; 
                  }} 
                />
                {restaurant.discount && (
                  <div className="discount-badge">
                    {restaurant.discount}
                  </div>
                )}
                <button 
                  className="favorite-btn"
                  onClick={() => toggleFavorite(restaurant.id)}
                >
                  {favorites.includes(restaurant.id) ? '❤️' : '🤍'}
                </button>
              </div>
              
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                
                <div className="rating">
                  <span className="rating-stars">⭐ {restaurant.rating}</span>
                  <span className="rating-text">({restaurant.reviewCount} reviews)</span>
                </div>
                
                <p>🍽️ {restaurant.speciality}</p>
                <p>💰 {restaurant.priceRange}</p>
                <p>📍 {restaurant.address}</p>
                
                <div className="restaurant-meta">
                  <span className={`status ${restaurant.status.toLowerCase()}`}>
                    {restaurant.status}
                  </span>
                  <span className="delivery-time">
                    🕒 {restaurant.deliveryTime}
                  </span>
                </div>
                
                <div className="action-buttons">
                  <button 
                    className="order-btn"
                    onClick={() => handleOrder(restaurant)}
                    disabled={restaurant.status === 'Closed'}
                  >
                    {restaurant.status === 'Closed' ? 'Closed' : 'Order Now'}
                  </button>
                  <button 
                    className="view-btn"
                    onClick={() => handleViewDetails(restaurant)}
                  >
                    View Details
                  </button>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  marginTop: '10px',
                  justifyContent: 'center'
                }}>
                  <button 
                    onClick={() => handleCall(restaurant.phone)}
                    style={{
                      background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    📞 Call
                  </button>
                  <button 
                    onClick={() => navigate(`/restaurant/${restaurant.id}/directions`)}
                    style={{
                      background: 'linear-gradient(45deg, #3498db, #2980b9)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🗺️ Directions
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="back-to-top-btn"
      >
        🔝
      </button>

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default RestaurantList;
