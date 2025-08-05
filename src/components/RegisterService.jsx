import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import './RegisterService.css';

const RegisterService = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    email: '',
    password: '',
    businessCategory: 'PROPERTY_SELLER' // Default category
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Business category options
  const categoryOptions = [
    { value: 'PROPERTY_SELLER', label: '🏠 Property Services' },
    { value: 'RESTAURANT_OWNER', label: '🍽️ Restaurant Owner' },
    { value: 'SALON_OWNER', label: '💇 Salon Owner' },
    { value: 'BAKERY_OWNER', label: '🧁 Bakery Owner' }
  ];

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

    // Only the required fields in payload
    const payload = {
      name: formData.ownerName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.businessCategory
    };

    try {
      const response = await axios.post('/signup', payload);
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user || payload));
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="background-image" />
      <div className="gradient-overlay" />
      <div className="floating-element-1" />
      <div className="floating-element-2" />

      <button onClick={() => navigate('/')} className="back-button">←</button>
      <div className="login-container">
        <div className="logo">🏪 Kart Hood</div>
        <h2 className="welcome-text">Join as Service Provider</h2>
        <p className="subtitle">Start your business journey with us!</p>

        <form onSubmit={handleSubmit} className="login-form">
          {loginError && <div className="error-message">{loginError}</div>}

          <div className="signup-fields">
            <label className="signup-label">Business Owner Name</label>
            <input
              type="text"
              name="ownerName"
              placeholder="👤 Owner Name"
              value={formData.ownerName}
              onChange={handleInputChange}
              required
              className="signup-input"
            />

            <label className="signup-label">Business Email</label>
            <input
              type="email"
              name="email"
              placeholder="📧 Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="signup-input"
            />

            <label className="signup-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="🔒 Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="signup-input password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <label className="signup-label">Business Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="📱 Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="signup-input"
            />

            <label className="signup-label">Business Category</label>
            <select
              name="businessCategory"
              value={formData.businessCategory}
              onChange={handleInputChange}
              required
              className="signup-input"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? (
              <>
                <div className="loading-spinner" />
                Creating Account...
              </>
            ) : (
              '💼 Join as Service Provider'
            )}
          </button>
        </form>

        <div className="auth-links">
          <p>Already have an account?
            <button onClick={() => navigate('/login')} className="link-button">
              Login here
            </button>
          </p>
          <p>Looking to buy/rent?
            <button onClick={() => navigate('/register-resident')} className="link-button">
              Register as Resident
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterService;

