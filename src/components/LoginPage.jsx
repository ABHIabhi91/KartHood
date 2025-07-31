import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      email: formData.email,
      password: formData.password
    };

    try {
      localStorage.removeItem('token');

      const response = await axios.post('/login', payload);

      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user || payload));

      navigate('/');
    } catch (err) {
      console.error('Authentication error:', err);
      if (err.response && err.response.status === 401) {
        setLoginError('Username or password is incorrect');
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
    <div className="login-page">
      {/* Glow background effect */}
      <div className="background-image" />
      <div className="gradient-overlay" />
      <div className="floating-element-1" />
      <div className="floating-element-2" />

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Back"
      >
        ←
      </button>

      {/* Main Container */}
      <div className="login-container">
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
              onClick={() => navigate('/register-resident')}
              className="register-button resident-register"
            >
              🏠 Register as Resident
            </button>
            <button
              onClick={() => navigate('/register-service')}
              className="register-button service-register"
            >
              💼 Join as Service Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
