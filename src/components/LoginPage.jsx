import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../utils/axiosInstance'; // adjust path as needed

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const [formData, setFormData] = useState({
  name: '',
  tower: '',
  flat: '',
  phone: '',
  email: '',
  password: ''
});
const inputStyle = {
  width: '100%',
  padding: '18px 20px',
  fontSize: '16px',
  border: '2px solid rgba(102, 126, 234, 0.2)',
  borderRadius: '15px',
  outline: 'none',
  background: 'rgba(255, 255, 255, 0.9)',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box',
  marginBottom: '15px'
};

  const [isSignUp, setIsSignUp] = useState(location.state?.mode === 'signup');

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     // Navigate to landing page after successful login
  //     navigate('/');
  //   }, 2000);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  
  //   const url = isSignUp ? 'http://localhost:8080/api/signup' : 'http://localhost:8080/api/login';
  //   const payload = isSignUp
  //     ? {
  //         name: formData.name,
  //         email: formData.email,
  //         password: formData.password,
  //         tower: formData.tower,
  //         flatNumber: formData.flat,
  //         phone: formData.phone
  //       }
  //     : {
  //         email: formData.email,
  //         password: formData.password
  //       };
  
  //   try {
  //     const res = await fetch(url, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload)
  //     });
  
  //     if (!res.ok) {
  //       throw new Error(`Error: ${res.status}`);
  //     }
  
  //     const data = await res.json();
  //     localStorage.setItem('token', data.token);
  //     localStorage.setItem('user', JSON.stringify(payload));
  //     navigate('/');
  //   } catch (err) {
  //     alert('❌ Authentication failed. Please check your details and try again.');
  //     console.error('Auth Error:', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(''); 
    const endpoint = isSignUp ? '/signup' : '/login';
  
    const payload = isSignUp
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          tower: formData.tower,
          flatNumber: formData.flat,
          phone: formData.phone
        }
      : {
          email: formData.email,
          password: formData.password
        };
  
    try {
      const response = await axios.post(endpoint, payload);
  
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user || payload));
  
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setLoginError('Invalid User'); // Or use error.response.data.message
      } else {
        setLoginError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: '', password: '' });
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/images/GLS2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1
      }} />

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.75))',
        zIndex: 2
      }} />

      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '150px',
        height: '150px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 2
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 2
      }} />

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'scale(1)';
        }}
      >
        ←
      </button>

      {/* Login Form Container */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '25px',
        padding: '50px 40px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'center',
        animation: 'slideInUp 0.8s ease-out'
      }}>
        {/* Logo */}
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          🏪 Kart Hood
        </div>

        {/* Welcome Text */}
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '30px',
          opacity: '0.9'
        }}>
          {isSignUp ? 'Create Your Account' : 'Welcome Back!'}
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>

        {loginError && (
  <div style={{
    marginBottom: '20px',
    color: 'red',
    fontWeight: '600',
    fontSize: '16px'
  }}>
    {loginError}
  </div>
)}


          {/* Email Input */}
          <div style={{ marginBottom: '25px', position: 'relative' }}>
            <input
              type="email"
              name="email"
              placeholder="📧 example@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '18px 20px',
                fontSize: '16px',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '15px',
                outline: 'none',
                background: 'rgba(255, 255, 255, 0.9)',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '25px', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="🔒 Choose a secure password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '18px 20px',
                paddingRight: '60px',
                fontSize: '16px',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '15px',
                outline: 'none',
                background: 'rgba(255, 255, 255, 0.9)',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#667eea',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#764ba2';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#667eea';
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Additional Fields for Sign Up */}
          {isSignUp && (
            <div style={{ marginBottom: '25px' }}>
              <input
                type="text"
                name="name"
                placeholder="👤 Anuj Sharma"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="tower"
                placeholder="🏢 12"
                value={formData.tower || ''}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="flat"
                placeholder="🔢 203"
                value={formData.flat || ''}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
              <input
                type="tel"
                name="phone"
                placeholder="📱 +91 XXXXXXXXXX"
                value={formData.phone || ''}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '18px 20px',
              fontSize: '16px',
              fontWeight: '600',
              background: isLoading
                ? 'linear-gradient(45deg, #95a5a6, #7f8c8d)'
                : 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.background = 'linear-gradient(45deg, #764ba2, #667eea)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Processing...
              </>
            ) : (
              <>
                {isSignUp ? '🚀 Create Account' : '🔑 Sign In'}
              </>
            )}
          </button>

          {/* Forgot Password Link */}
          {!isSignUp && (
            <div style={{ marginBottom: '25px' }}>
              <a
                href="#"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#764ba2';
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = '#667eea';
                  e.target.style.textDecoration = 'none';
                }}
              >
                Forgot your password?
              </a>
            </div>
          )}

          {/* Toggle Mode */}
          <div style={{
            textAlign: 'center',
            color: '#7f8c8d',
            fontSize: '14px',
            marginTop: '20px'
          }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={toggleMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                cursor: 'pointer',
                fontWeight: '600',
                marginLeft: '5px',
                textDecoration: 'underline',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#764ba2';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#667eea';
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>

        {/* Social Login Options */}
        <div style={{
          marginTop: '30px',
          paddingTop: '25px',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{
            color: '#7f8c8d',
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            Or continue with
          </p>
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center'
          }}>
            <button style={{
              background: 'linear-gradient(45deg, #4285f4, #357ae8)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              G Google
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 30px 20px !important;
            margin: 10px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;