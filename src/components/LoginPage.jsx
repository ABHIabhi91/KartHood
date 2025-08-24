import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import './LoginPage.css';

const LoginPage = () => {
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
  const userData = response.data.user || payload;
  
  // Store all necessary data
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('userType', formData.userType); // Add this line
  
  // Role-based navigation with state
  if (formData.userType === 'Resident') {
    navigate('/resident/dashboard', { 
      state: { user: userData },
      replace: true 
    });
  } else if (formData.userType === 'Service Provider') {
    navigate('/service/dashboard', { 
      state: { user: userData },
      replace: true 
    });
  } else {
    navigate('/');
  }
} catch (err)  {
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
    <div className="login-page">
      <button
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Back"
      >
        ←
      </button>

      {/* Split Container */}
      <div className="split-container">
        {/* Left Panel - Society Image & Branding */}
        <div className="left-panel">
          <div className="brand-content">
            <h1 className="brand-title">Kart Hood</h1>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="right-panel">
          <div className="login-container">
            <h2 className="welcome-text">Welcome Back!</h2>
            <p className="subtitle">
              Don't have an account? 
              <button onClick={() => navigate('/register')} className="login-link">
                Sign up
              </button>
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              {loginError && (
                <div className="error-message" role="alert">
                  {loginError}
                </div>
              )}

              <div className="input-group">
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

              <div className="input-group">
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

              <div className="user-type-group" role="radiogroup">
                <div className="radio-options">
                  <input
                    type="radio"
                    id="resident"
                    name="userType"
                    value="Resident"
                    checked={formData.userType === 'Resident'}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <label htmlFor="resident" className="radio-label">
                    🏠 Resident
                  </label>
                  
                  <input
                    type="radio"
                    id="service"
                    name="userType"
                    value="Service Provider"
                    checked={formData.userType === 'Service Provider'}
                    onChange={handleInputChange}
                    className="form-radio"
                  />
                  <label htmlFor="service" className="radio-label">
                    🔧 Service Provider
                  </label>
                </div>
              </div>

              <div className="forgot-password">
                <a href="#" className="forgot-password-link">
                  Forgot your password?
                </a>
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
                  '🔐 Sign In'
                )}
              </button>
            </form>

            {/* Register Options */}
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
                  🔧 Join as Service Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
