import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        if (user.role === 'BUYER') {
          console.log('User is logged in as buyer:', user.name);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logout();
    navigate('/login');
  };

  const handleLoginClick = () => navigate('/login');
  const handleResidentClick = () => navigate('/register-resident');
  const handleServiceClick = () => navigate('/register-service');

  const shops = [
    {
      id: 1,
      name: 'BroscEbda',
      img: '/images/pizza.jpg',
      rating: '⭐⭐⭐⭐ 1201',
      desc: 'Indian · Open until 10 PM',
      category: 'restaurant',
      isOpen: true,
      phone: '9876543210'
    },
    {
      id: 2,
      name: 'Style Studio',
      img: '/images/unisexsalon.jpg',
      rating: '⭐⭐⭐⭐ 245',
      desc: 'Unisex Salon',
      category: 'salon',
      isOpen: true,
      phone: '9876543211'
    },
    {
      id: 3,
      name: 'Sweet Crumbs',
      img: '/images/bakery1.jpeg',
      rating: '⭐⭐⭐ 194',
      desc: 'Bakery · Open until 9 PM',
      category: 'bakery',
      isOpen: true,
      phone: '9876543212'
    },
    {
      id: 4,
      name: 'Glam & Glow',
      img: '/images/salon2.jpeg',
      rating: '⭐⭐⭐⭐ 310',
      desc: 'Salon · Open until 8 PM',
      category: 'salon',
      isOpen: false,
      phone: '9876543213'
    },
    {
      id: 5,
      name: 'Food Fiesta',
      img: '/images/restaurant.jpg',
      rating: '⭐⭐⭐⭐⭐ 422',
      desc: 'Multi-cuisine delight',
      category: 'restaurant',
      isOpen: true,
      phone: '9876543214'
    },
    {
      id: 6,
      name: 'Choco Treats',
      img: '/images/bakery.jpg',
      rating: '⭐⭐⭐⭐ 180',
      desc: 'Cakes & Pastries',
      category: 'bakery',
      isOpen: true,
      phone: '9876543215'
    }
  ];

  const categories = [
    {
      name: 'Restaurant',
      count: shops.filter(s => s.category === 'restaurant').length,
      img: '/images/restaurant.jpg',
      gradient: 'linear-gradient(45deg, #ff6b6b, #ee5a24)'
    },
    {
      name: 'Salon',
      count: shops.filter(s => s.category === 'salon').length,
      img: '/images/salon.jpg',
      gradient: 'linear-gradient(45deg, #667eea, #764ba2)'
    },
    {
      name: 'Bakery',
      count: shops.filter(s => s.category === 'bakery').length,
      img: '/images/bakery.jpg',
      gradient: 'linear-gradient(45deg, #f093fb, #f5576c)'
    },
    {
      name: 'Beauty Parlour',
      count: 2,
      img: '/images/beauty-parlour.jpg',
      gradient: 'linear-gradient(45deg, #4facfe, #00f2fe)'
    },
    {
      name: 'Property',
      count: 2,
      img: '/images/propertylogo.jpeg',
      gradient: 'linear-gradient(45deg, #4facfe, rgb(0, 254, 76))'
    }
  ];

  useEffect(() => {
    if (searchTerm) {
      const filtered = shops.filter(shop =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredShops(filtered);
    } else {
      setFilteredShops(shops);
    }
  }, [searchTerm]);

  const handleCategoryClick = (categoryName) => {
    const routes = {
      'Restaurant': '/restaurants',
      'Salon': '/salons',
      'Bakery': '/bakeries',
      'Beauty Parlour': '/beauty-parlours',
      'Property': '/properties'
    };
    navigate(routes[categoryName] || '/');
  };

  const handleShopClick = (shop) => navigate(`/shop/${shop.id}`, { state: { shop } });

  const handleCallShop = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const getCurrentUser = () => {
    if (currentUser) return currentUser;

    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return user.role === 'BUYER' ? user : null;
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const isBuyerLoggedIn = () => {
    const token = localStorage.getItem('token');
    const user = getCurrentUser();
    return token && user && user.role === 'BUYER';
  };

  const displayUser = getCurrentUser();
  const buyerLoggedIn = isBuyerLoggedIn();

  return (
    <div>
      {/* Login Bar */}
      <div className="login-bar">
        <h1>🏪 Kart Hood</h1>
        <div>
          {buyerLoggedIn && displayUser ? (
            <div className="login-loggedin">
              <span className="welcome-msg">Hi {displayUser.name}! 👋</span>
              <button className="login-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="login-buttons">
              <button className="login-btn" onClick={handleLoginClick}>🔑 Login</button>
              <button className="login-btn resident-btn" onClick={handleResidentClick}>🏠 Register as Resident</button>
              <button className="login-btn service-btn" onClick={handleServiceClick}>💼 Join as Service</button>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="header-image">
        <div className="header-content">
          <h1>Discover Local Treasures</h1>
          <p>Find the best shops, restaurants, and services in your neighborhood</p>
          <button className="explore-btn" onClick={() => {
            document.querySelector('.categories').scrollIntoView({ behavior: 'smooth' });
          }}>Explore Now</button>
        </div>
      </div>

      <div className="search-bar">
        <i className="search-icon">🔍</i>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for shops, restaurants, services..."
          className="search-input"
        />
      </div>




      {/* Categories */}
      <h2 className="section-title">🏷️ Shop by Category</h2>
      <div className="categories">
        {categories.map((cat) => (
          <div className="category-card" key={cat.name}>
            <img src={cat.img} alt={cat.name} />
            <h4>{cat.name}</h4>
            <p>{cat.count} Shops Available</p>
            <button className="explore-btn" style={{ background: cat.gradient }} onClick={() => handleCategoryClick(cat.name)}>Explore {cat.name}s</button>
          </div>
        ))}
      </div>

      {/* Shops and Featured */}
      <div className="sections-container">
        <div className="shops-box">
          <h3 className="shops-heading">🏪 {searchTerm ? 'Search Results' : 'Popular Shops in CP1'}</h3>
          {filteredShops.length === 0 ? (
            <div className="no-shops-message">
              <p>No shops found matching your search.</p>
            </div>
          ) : (
            filteredShops.map((shop) => (
              <div className="shop-card" key={shop.id} onClick={() => handleShopClick(shop)} role="button" tabIndex={0}>
                <img src={shop.img} alt={shop.name} />
                <div className="shop-info">
                  <h4>{shop.name}</h4>
                  <div className="stars">{shop.rating}</div>
                  <div className="desc">{shop.desc}</div>
                  <div className={`status ${shop.isOpen ? 'open' : 'closed'}`}>
                    {shop.isOpen ? '🟢 Open' : '🔴 Closed'}
                  </div>
                </div>
                <div className="shop-actions">
                  <button className="view-button" onClick={(e) => { e.stopPropagation(); handleShopClick(shop); }}>
                    View Details
                  </button>
                  <button className="call-btn" onClick={(e) => { e.stopPropagation(); handleCallShop(shop.phone); }}>
                    📞 Call
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="shopkeeper-box">
          <h3>🌟 Featured: Coders! Cafe</h3>
          <div className="featured-info">
            <p>🕙 <strong>Hours:</strong> 10:00 AM - 11:00 PM</p>
            <p>🏢 <strong>Location:</strong> Tower A Shop 3</p>
            <p>📞 <strong>Phone:</strong> 1284567860</p>
            <p>⭐ <strong>Rating:</strong> 4.7/5 (320 reviews)</p>
          </div>

          <div className="featured-buttons">
            <button className="call-btn" onClick={() => handleCallShop('1284567860')}>📞 Call Now</button>
            <button className="view-button" onClick={() => navigate('/shop/coders-cafe')}>View Menu</button>
          </div>

          <div className="menu">
            <h4>🍽️ Popular Items</h4>
            <div className="menu-items">
              <p>🥖 Bruschetta — ₹150</p>
              <p>☕ Cappuccino — ₹120</p>
              <p>🍰 Chocolate Cake — ₹180</p>
              <p>🥪 Club Sandwich — ₹200</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">🚀 Why Choose Kart Hood?</h2>
        <div className="features-grid">
          {[
            { icon: '🔍', title: 'Easy Discovery', desc: 'Find local businesses with smart search' },
            { icon: '⭐', title: 'Verified Reviews', desc: 'Read authentic customer experiences' },
            { icon: '📱', title: 'Quick Contact', desc: 'Call or visit shops directly from the app' },
            { icon: '🕒', title: 'Live Updates', desc: 'Real-time open/closed status' }
          ].map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
