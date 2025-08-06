import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LoginPage from './LoginPage';

const LandingPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

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

  const handleShopClick = (shop) => {
    navigate(`/shop/${shop.id}`, { state: { shop } });
  };

  const handleCallShop = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="landing-page">
      {/* Enhanced Login Bar */}
      <div className="login-bar">
        <h1>🏪 Kart Hood</h1>
        <div>
          {user ? (
            <span className="welcome-msg">Welcome back, {user.name}! 👋</span>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="login-btn" onClick={() => navigate('/login', { state: { mode: 'signup' } })}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Enhanced Header with Content */}
      <div className="header-image">
        <div className="header-content">
          <h1>Discover Local Treasures</h1>
          <p>Find the best shops, restaurants, and services in your neighborhood</p>
          <button className="explore-btn" onClick={() => {
            document.querySelector('.categories').scrollIntoView({ behavior: 'smooth' });
          }}>
            Explore Now
          </button>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div style={{ 
        padding: '40px 20px', 
        textAlign: 'center', 
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <input
          type="text"
          placeholder="🔍 Search for shops, restaurants, services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '600px',
            padding: '15px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '25px',
            outline: 'none',
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>

      {/* Enhanced Categories Section */}
      <h2 className="section-title">🏷️ Shop by Category</h2>
      <div className="categories">
        {categories.map((cat) => (
          <div className="category-card" key={cat.name}>
            <img src={cat.img} alt={cat.name} />
            <h4>{cat.name}</h4>
            <p>{cat.count} Shops Available</p>
            <button
              className="explore-btn"
              onClick={() => handleCategoryClick(cat.name)}
              style={{ background: cat.gradient }}
            >
              Explore {cat.name}s
            </button>
            {cat.name === 'Property' && (
        <button
          className="explore-btn"
          onClick={() => navigate('/login', { state: { mode: 'owner' } })}
          style={{
            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
            marginTop: '10px'
          }}
        >
          Login as Owner
        </button>
      )}
          </div>
        ))}
      </div>

      {/* Enhanced Shops Section */}
      <div className="sections-container">
        <div className="shops-box">
          <h3 className="shops-heading">
            🏪 {searchTerm ? 'Search Results' : 'Popular Shops in CP1'}
          </h3>
          
          {filteredShops.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              color: '#7f8c8d'
            }}>
              <p>No shops found matching your search.</p>
            </div>
          ) : (
            filteredShops.map((shop) => (
              <div 
                className="shop-card" 
                key={shop.id}
                onClick={() => handleShopClick(shop)}
                style={{ cursor: 'pointer' }}
              >
                <img src={shop.img} alt={shop.name} />
                <div className="shop-info">
                  <h4>{shop.name}</h4>
                  <div className="stars">{shop.rating}</div>
                  <div className="desc">{shop.desc}</div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: shop.isOpen ? '#27ae60' : '#e74c3c',
                    fontWeight: 'bold',
                    marginTop: '5px'
                  }}>
                    {shop.isOpen ? '🟢 Open' : '🔴 Closed'}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button 
                    className="view-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShopClick(shop);
                    }}
                  >
                    View Details
                  </button>
                  <button 
                    className="call-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCallShop(shop.phone);
                    }}
                    style={{ 
                      fontSize: '10px', 
                      padding: '6px 12px',
                      background: 'linear-gradient(45deg, #27ae60, #2ecc71)'
                    }}
                  >
                    📞 Call
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Featured Shop */}
        <div className="shopkeeper-box">
          <h3>🌟 Featured: Coders! Cafe</h3>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.5)', 
            padding: '20px', 
            borderRadius: '15px',
            marginBottom: '20px'
          }}>
            <p>🕙 <strong>Hours:</strong> 10:00 AM - 11:00 PM</p>
            <p>🏢 <strong>Location:</strong> Tower A Shop 3</p>
            <p>📞 <strong>Phone:</strong> 1284567860</p>
            <p>⭐ <strong>Rating:</strong> 4.7/5 (320 reviews)</p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button 
              className="call-btn"
              onClick={() => handleCallShop('1284567860')}
            >
              📞 Call Now
            </button>
            <button 
              className="view-button"
              onClick={() => navigate('/shop/coders-cafe')}
            >
              View Menu
            </button>
          </div>

          <div className="menu">
            <h4>🍽️ Popular Items</h4>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.3)', 
              padding: '15px', 
              borderRadius: '10px' 
            }}>
              <p>🥖 Bruschetta — ₹150</p>
              <p>☕ Cappuccino — ₹120</p>
              <p>🍰 Chocolate Cake — ₹180</p>
              <p>🥪 Club Sandwich — ₹200</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Features Section */}
      <div style={{ 
        padding: '60px 20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 className="section-title">🚀 Why Choose Kart Hood?</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { icon: '🔍', title: 'Easy Discovery', desc: 'Find local businesses with smart search' },
            { icon: '⭐', title: 'Verified Reviews', desc: 'Read authentic customer experiences' },
            { icon: '📱', title: 'Quick Contact', desc: 'Call or visit shops directly from the app' },
            { icon: '🕒', title: 'Live Updates', desc: 'Real-time open/closed status' }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '30px 20px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{feature.icon}</div>
              <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>{feature.title}</h4>
              <p style={{ color: '#7f8c8d', fontSize: '14px' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
