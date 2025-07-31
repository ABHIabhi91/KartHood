import React, { useState, useEffect } from 'react';
import './RestaurantList.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LoginModal from './LoginModal';

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

const RestaurantList = () => {
  const navigate = useNavigate();
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const filters = [
    { id: 'all', label: 'All Restaurants', count: restaurants.length },
    { id: 'open', label: 'Open Now', count: restaurants.filter(r => r.status === 'Open').length },
    { id: 'indian', label: 'Indian', count: restaurants.filter(r => r.cuisine === 'Indian').length },
    { id: 'multi-cuisine', label: 'Multi-cuisine', count: restaurants.filter(r => r.cuisine === 'Multi-cuisine').length },
    { id: 'discount', label: 'Offers', count: restaurants.filter(r => r.discount).length }
  ];

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
      <span className="welcome-msg">Hi, {user.name} 👋</span>
    ) : (
      <>
        <button className="login-btn" onClick={() => setShowLoginModal(true)}>
          Login
        </button>
        <button className="login-btn" onClick={() => navigate('/register')}>
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

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
      >
      </button>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

    </div>
  );
};

export default RestaurantList;