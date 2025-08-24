import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import './RegisterResident.css';

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

    // Using your exact payload structure that works
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      tower: formData.tower,
      flatNumber: formData.flat, // Note: keeping your flatNumber field name
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
      
      // Your exact error handling logic
      if (err.response?.data?.message) {
        setLoginError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setLoginError(err.response.data.error);
      } else if (err.response?.data) {
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
    <div className="register-page">
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
        {/* Left Panel - Society Image & Branding */}
        <div className="left-panel-resident">
          <div className="brand-content">
            <div className="brand-text">
              <h1 className="brand-title">🏪 Kart Hood</h1>
            </div>
          </div>
        </div>

        {/* Right Panel - Registration Form */}
        <div className="right-panel">
          <div className="register-container">
            <h2 className="welcome-text">Register as Resident</h2>
            <p className="subtitle">
              Join your community today! Already have an account? 
              <button onClick={() => navigate('/login')} className="login-link">
                Login here
              </button>
            </p>

            <form onSubmit={handleSubmit} className="register-form">
              {loginError && (
                <div className="error-message" role="alert">
                  {loginError}
                </div>
              )}

              <div className="signup-fields">
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="👤 Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="signup-input"
                    autoComplete="name"
                  />
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="📧 Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="signup-input"
                    autoComplete="email"
                  />
                </div>

                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="🔒 Create Password"
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

                <div className="form-row">
                  <div className="input-group">
                    <input
                      type="text"
                      name="tower"
                      placeholder="🏢 Tower Number"
                      value={formData.tower}
                      onChange={handleInputChange}
                      required
                      className="signup-input"
                    />
                  </div>

                  <div className="input-group">
                    <input
                      type="text"
                      name="flat"
                      placeholder="🔢 Flat Number"
                      value={formData.flat}
                      onChange={handleInputChange}
                      required
                      className="signup-input"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="📱 Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="signup-input"
                    autoComplete="tel"
                  />
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
                  '🏠 Register as Resident'
                )}
              </button>
            </form>

            {/* Auth Links */}
            <div className="auth-links">
              <p>Want to provide services?</p>
              <div className="register-options">
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
      </div>
    </div>
  );
};

export default RegisterResident;
