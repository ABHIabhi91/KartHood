import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import './RegisterResident.css'; // Reuse the same CSS

const RegisterResident = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    tower: '',
    flat: '',
    phone: '',
    email: '',
    password: '',
    role: 'BUYER'
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

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      tower: formData.tower,
      flatNumber: formData.flat,
      phone: formData.phone,
      role: 'BUYER'
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
      {/* Background Elements */}
      <div className="background-image" />
      <div className="gradient-overlay" />
      <div className="floating-element-1" />
      <div className="floating-element-2" />

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="back-button"
      >
        ←
      </button>

      {/* Main Container */}
      <div className="login-container">
        <div className="logo">
          🏪 Kart Hood
        </div>
        <h2 className="welcome-text">Register as Resident</h2>
        <p className="subtitle">Join your community today!</p>

        <form onSubmit={handleSubmit} className="login-form">
          {loginError && (
            <div className="error-message">
              {loginError}
            </div>
          )}

          <div className="signup-fields">
            <input
              type="text"
              name="name"
              placeholder="👤 Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="signup-input"
            />
            <input
              type="email"
              name="email"
              placeholder="📧 Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="signup-input"
            />
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="🔒 Create Password"
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
            <input
              type="text"
              name="tower"
              placeholder="🏢 Tower Number"
              value={formData.tower}
              onChange={handleInputChange}
              required
              className="signup-input"
            />
            <input
              type="text"
              name="flat"
              placeholder="🔢 Flat Number"
              value={formData.flat}
              onChange={handleInputChange}
              required
              className="signup-input"
            />
            <input
              type="tel"
              name="phone"
              placeholder="📱 Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="signup-input"
            />
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
              '🏠 Register as Resident'
            )}
          </button>
        </form>

        <div className="auth-links">
          <p>Already have an account?
            <button
              onClick={() => navigate('/login')}
              className="link-button"
            >
              Login here
            </button>
          </p>
          <p>Want to provide services?
            <button
              onClick={() => navigate('/register-service')}
              className="link-button"
            >
              Join as Service Provider
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterResident;
