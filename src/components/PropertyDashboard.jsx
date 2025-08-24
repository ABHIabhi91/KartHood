// components/PropertyDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid, getTokenData, logout } from '../utils/auth';
import './PropertyDashboard.css';

const PropertyDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check JWT token validity
    if (!isTokenValid()) {
      navigate('/login');
      return;
    }

    // Get user data from token
    const tokenData = getTokenData();
    if (tokenData) {
      setUserData({
        name: tokenData.name || tokenData.username || 'Property Seller',
        email: tokenData.email || '',
        businessName: tokenData.businessName || 'Your Business'
      });
    }

    // Check if first time login
    const hasVisited = localStorage.getItem('hasVisitedDashboard');
    if (!hasVisited) {
      setIsFirstTime(true);
      localStorage.setItem('hasVisitedDashboard', 'true');
    } else {
      setIsFirstTime(false);
    }

    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    logout();
  };

  const handleAddProperty = () => {
    navigate('/service-provider/property/add');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="vertex-layout">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If no user data, redirect to login
  if (!userData) {
    navigate('/login');
    return null;
  }

  return (
    <div className="vertex-layout">
      {/* Header Navigation */}
      <header className="crystal-bar">
        <div className="prism-content">
          <div className="orbit-section">
            <span className="nexus-logo">🏠</span>
            <span className="flux-name">One Community Hub</span>
          </div>
          
          <nav className="plasma-nav">
            <a href="#dashboard" className="spark-link active">Dashboard</a>
            <a href="#properties" className="spark-link">Properties</a>
            <a href="#inquiries" className="spark-link">Inquiries</a>
            <a href="#profile" className="spark-link">Profile</a>
          </nav>
          
          <div className="user-section">
            <span className="user-name">Welcome, {userData.name}</span>
            <button className="quantum-exit" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="matrix-main">
        {/* Welcome Banner */}
        <div className="cosmos-banner">
          <h1>🎉 Welcome to Your Property Seller Dashboard, {userData.name}!</h1>
          <p>You're all set! Start by adding your first property listing.</p>
        </div>

        {isFirstTime && (
          <div className="phoenix-section">
            <h2>Getting Started</h2>
            <div className="stellar-card">
              <div className="nova-step">
                <div className="eclipse-icon">📋</div>
                <div className="vortex-content">
                  <h3>Step 1: Add Your First Property</h3>
                  <p>Create detailed listings with photos</p>
                  <button 
                    className="titan-cta"
                    onClick={handleAddProperty}
                  >
                    + Add Property
                  </button>
                </div>
              </div>
              
              <div className="nova-step">
                <div className="eclipse-icon">👀</div>
                <div className="vortex-content">
                  <h3>Step 2: Get Discovered</h3>
                  <p>Residents will see your listings</p>
                </div>
              </div>
              
              <div className="nova-step">
                <div className="eclipse-icon">💬</div>
                <div className="vortex-content">
                  <h3>Step 3: Handle Inquiries</h3>
                  <p>Respond to buyer messages & book visits</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="meteor-section">
          <h2>Quick Stats</h2>
          <div className="galaxy-grid">
            <div className="comet-card">
              <div className="lunar-number">0</div>
              <div className="solar-label">Active Properties</div>
            </div>
            <div className="comet-card">
              <div className="lunar-number">0</div>
              <div className="solar-label">Views This Week</div>
            </div>
            <div className="comet-card">
              <div className="lunar-number">0</div>
              <div className="solar-label">Inquiries Pending</div>
            </div>
            <div className="comet-card">
              <div className="lunar-number">0</div>
              <div className="solar-label">Sold This Month</div>
            </div>
          </div>
        </div>

        {/* Empty State CTA */}
        <div className="nebula-state">
          <p>No properties yet? No problem!</p>
          <button 
            className="asteroid-cta"
            onClick={handleAddProperty}
          >
            + Add Your First Property
          </button>
        </div>
      </main>
    </div>
  );
};

export default PropertyDashboard;
