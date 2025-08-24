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
      
      // Check multiple possible error message locations
      if (err.response?.data?.message) {
        setLoginError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setLoginError(err.response.data.error);
      } else if (err.response?.data) {
        // If the entire response.data is a string message
        setLoginError(typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data));
      } else if (err.message) {
        setLoginError(err.message);
      } else {
        setLoginError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="service-register-page">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Back"
      >
        ←
      </button>

      {/* Split Container */}
      <div className="split-container">
        {/* Left Panel - Business Image & Branding */}
        <div className="left-panel-service">
          <div className="brand-content">
            <div className="brand-text">
              <h1 className="brand-title">🏪 Kart Hood</h1>
            </div>
          </div>
        </div>

        {/* Right Panel - Registration Form */}
        <div className="right-panel">
          <div className="service-register-container">
            <h2 className="welcome-text">Join as Service Provider</h2>
            <p className="subtitle">
              Start your business journey with us! Already have an account? 
              <button onClick={() => navigate('/login')} className="login-link">
                Login here
              </button>
            </p>

            <form onSubmit={handleSubmit} className="service-register-form">
              {loginError && (
                <div className="error-message" role="alert">
                  {loginError}
                </div>
              )}

              <div className="signup-fields">
                <div className="field-group">
                  <label className="signup-label">Business Owner Name</label>
                  <input
                    type="text"
                    name="ownerName"
                    placeholder="👤 Owner Name"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                    className="signup-input"
                    autoComplete="name"
                  />
                </div>

                <div className="field-group">
                  <label className="signup-label">Business Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="📧 Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="signup-input"
                    autoComplete="email"
                  />
                </div>

                <div className="field-group">
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
                      autoComplete="new-password"
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
                </div>

                <div className="field-group">
                  <label className="signup-label">Business Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="📱 Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="signup-input"
                    autoComplete="tel"
                  />
                </div>

                <div className="field-group">
                  <label className="signup-label">Business Category</label>
                  <select
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleInputChange}
                    required
                    className="signup-input select-input"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
                    Creating Account...
                  </>
                ) : (
                  '💼 Join as Service Provider'
                )}
              </button>
            </form>

            {/* Auth Links */}
            <div className="auth-links">
              <p>Looking to buy/rent?</p>
              <div className="register-options">
                <button
                  onClick={() => navigate('/register-resident')}
                  className="register-button resident-register"
                >
                  🏠 Register as Resident
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterService;
