import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ServiceDashboard.css';

const PropertySellerDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const serviceUser = location.state?.user || 
                       JSON.parse(localStorage.getItem('user') || 'null');
    
    const userType = localStorage.getItem('userType');

    React.useEffect(() => {
        if (!serviceUser || userType !== 'Service Provider') {
            navigate('/login');
        }
    }, [serviceUser, userType, navigate]);

    if (!serviceUser) {
        return <div className="psd-loading">Loading...</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        navigate('/');
    };

    // Mock data for beautiful dashboard
    const dashboardStats = [
        {
            title: 'Total Properties',
            value: '24',
            change: '+12%',
            changeType: 'positive',
            icon: '🏠',
            color: 'psd-blue'
        },
        {
            title: 'Total Views',
            value: '8,549',
            change: '+23%',
            changeType: 'positive',
            icon: '👁️',
            color: 'psd-green'
        },
        {
            title: 'Active Inquiries',
            value: '47',
            change: '+8%',
            changeType: 'positive',
            icon: '💬',
            color: 'psd-orange'
        },
        {
            title: 'Properties Sold',
            value: '12',
            change: '-4%',
            changeType: 'negative',
            icon: '✅',
            color: 'psd-purple'
        }
    ];

    const recentPropertyList = [
        {
            id: 1,
            title: '3BHK Luxury Apartment',
            location: 'Tower A, Floor 12',
            price: '₹1.2 Cr',
            status: 'Active',
            views: 234,
            image: '🏢'
        },
        {
            id: 2,
            title: '2BHK Modern Flat',
            location: 'Tower B, Floor 8',
            price: '₹85 L',
            status: 'Under Review',
            views: 189,
            image: '🏠'
        },
        {
            id: 3,
            title: 'Penthouse Suite',
            location: 'Tower C, Floor 20',
            price: '₹2.5 Cr',
            status: 'Sold',
            views: 567,
            image: '🏰'
        }
    ];

    const recentInquiryList = [
        {
            id: 1,
            buyer: 'Rahul Sharma',
            property: '3BHK Luxury Apartment',
            time: '2 hours ago',
            status: 'New',
            avatar: '👨‍💼'
        },
        {
            id: 2,
            buyer: 'Priya Patel',
            property: '2BHK Modern Flat',
            time: '5 hours ago',
            status: 'Responded',
            avatar: '👩‍💼'
        },
        {
            id: 3,
            buyer: 'Amit Kumar',
            property: 'Penthouse Suite',
            time: '1 day ago',
            status: 'Meeting Scheduled',
            avatar: '👨‍💻'
        }
    ];

    return (
        <div className="psd-dashboard-wrapper">
            {/* Top Header */}
            <header className="psd-top-header">
                <div className="psd-header-inner">
                    <div className="psd-header-start">
                        <div className="psd-brand-section">
                            <div className="psd-brand-logo">🏠</div>
                            <div className="psd-brand-info">
                                <h1>Kart Hood</h1>
                                <span>Property Management</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="psd-header-middle">
                        <div className="psd-search-container">
                            <span className="psd-search-icon">🔍</span>
                            <input type="text" placeholder="Search properties, buyers, inquiries..." className="psd-search-input" />
                        </div>
                    </div>
                    
                    <div className="psd-header-end">
                        <div className="psd-notifications">
                            <span className="psd-notification-icon">🔔</span>
                            <span className="psd-notification-count">3</span>
                        </div>
                        <div className="psd-user-section">
                            <div className="psd-user-avatar">👤</div>
                            <div className="psd-user-details">
                                <span className="psd-user-name">{serviceUser.businessName || serviceUser.name}</span>
                                <span className="psd-user-title">Property Seller</span>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="psd-logout-button">
                            <span>🚪</span> Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Sidebar Navigation */}
            <aside className="psd-side-navigation">
                <nav className="psd-nav-menu">
                    <div className="psd-nav-group">
                        <div className="psd-nav-link psd-nav-active">
                            <span className="psd-nav-icon">📊</span>
                            <span className="psd-nav-label">Dashboard</span>
                        </div>
                        <div className="psd-nav-link" onClick={() => navigate('/services/properties')}>
                            <span className="psd-nav-icon">🏘️</span>
                            <span className="psd-nav-label">Properties</span>
                            <span className="psd-nav-count">24</span>
                        </div>
                        <div className="psd-nav-link" onClick={() => navigate('/services/inquiries')}>
                            <span className="psd-nav-icon">💬</span>
                            <span className="psd-nav-label">Inquiries</span>
                            <span className="psd-nav-count">47</span>
                        </div>
                        <div className="psd-nav-link" onClick={() => navigate('/services/analytics')}>
                            <span className="psd-nav-icon">📈</span>
                            <span className="psd-nav-label">Analytics</span>
                        </div>
                        <div className="psd-nav-link" onClick={() => navigate('/services/profile')}>
                            <span className="psd-nav-icon">👤</span>
                            <span className="psd-nav-label">Profile</span>
                        </div>
                    </div>
                    
                    <div className="psd-nav-group">
                        <div className="psd-nav-link">
                            <span className="psd-nav-icon">⚙️</span>
                            <span className="psd-nav-label">Settings</span>
                        </div>
                        <div className="psd-nav-link">
                            <span className="psd-nav-icon">📞</span>
                            <span className="psd-nav-label">Support</span>
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="psd-main-area">
                {/* Welcome Section */}
                <section className="psd-welcome-banner">
                    <div className="psd-welcome-inner">
                        <div className="psd-welcome-message">
                            <h2>Good evening, {serviceUser.businessName || serviceUser.name}! 👋</h2>
                            <p>Here's what's happening with your properties today.</p>
                        </div>
                        <div className="psd-quick-buttons">
                            <button className="psd-action-primary" onClick={() => navigate('/service/add-property')}>
                                <span>➕</span> Add Property
                            </button>
                            <button className="psd-action-secondary">
                                <span>📊</span> View Analytics
                            </button>
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="psd-stats-area">
                    <div className="psd-stats-container">
                        {dashboardStats.map((stat, index) => (
                            <div key={index} className={`psd-stat-box ${stat.color}`}>
                                <div className="psd-stat-top">
                                    <div className="psd-stat-emoji">{stat.icon}</div>
                                    <div className={`psd-stat-trend psd-trend-${stat.changeType}`}>
                                        {stat.change}
                                    </div>
                                </div>
                                <div className="psd-stat-body">
                                    <h3 className="psd-stat-number">{stat.value}</h3>
                                    <p className="psd-stat-text">{stat.title}</p>
                                </div>
                                <div className="psd-stat-chart">
                                    <div className="psd-mini-graph"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Content Grid */}
                <div className="psd-content-container">
                    {/* Recent Properties */}
                    <section className="psd-content-panel psd-properties-panel">
                        <div className="psd-panel-header">
                            <h3>Recent Properties</h3>
                            <button className="psd-view-all">View All</button>
                        </div>
                        <div className="psd-properties-list">
                            {recentPropertyList.map((property) => (
                                <div key={property.id} className="psd-property-row">
                                    <div className="psd-property-thumb">{property.image}</div>
                                    <div className="psd-property-info">
                                        <h4>{property.title}</h4>
                                        <p className="psd-property-address">{property.location}</p>
                                        <div className="psd-property-tags">
                                            <span className="psd-property-cost">{property.price}</span>
                                            <span className={`psd-property-badge psd-badge-${property.status.toLowerCase().replace(' ', '-')}`}>
                                                {property.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="psd-property-metrics">
                                        <span className="psd-view-count">👁️ {property.views}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recent Inquiries */}
                    <section className="psd-content-panel psd-inquiries-panel">
                        <div className="psd-panel-header">
                            <h3>Recent Inquiries</h3>
                            <button className="psd-view-all">View All</button>
                        </div>
                        <div className="psd-inquiries-list">
                            {recentInquiryList.map((inquiry) => (
                                <div key={inquiry.id} className="psd-inquiry-row">
                                    <div className="psd-inquiry-thumb">{inquiry.avatar}</div>
                                    <div className="psd-inquiry-info">
                                        <h4>{inquiry.buyer}</h4>
                                        <p className="psd-inquiry-subject">{inquiry.property}</p>
                                        <span className="psd-inquiry-timestamp">{inquiry.time}</span>
                                    </div>
                                    <div className="psd-inquiry-controls">
                                        <span className={`psd-inquiry-badge psd-badge-${inquiry.status.toLowerCase().replace(' ', '-')}`}>
                                            {inquiry.status}
                                        </span>
                                        <button className="psd-reply-button">Reply</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Chart Section */}
                <section className="psd-chart-area">
                    <div className="psd-chart-panel">
                        <div className="psd-chart-header">
                            <h3>Property Performance</h3>
                            <div className="psd-chart-tabs">
                                <button className="psd-chart-tab psd-tab-active">7 Days</button>
                                <button className="psd-chart-tab">30 Days</button>
                                <button className="psd-chart-tab">90 Days</button>
                            </div>
                        </div>
                        <div className="psd-chart-body">
                            <div className="psd-chart-visual">
                                <div className="psd-chart-columns">
                                    <div className="psd-column" style={{height: '60%'}}></div>
                                    <div className="psd-column" style={{height: '80%'}}></div>
                                    <div className="psd-column" style={{height: '45%'}}></div>
                                    <div className="psd-column" style={{height: '90%'}}></div>
                                    <div className="psd-column" style={{height: '70%'}}></div>
                                    <div className="psd-column" style={{height: '85%'}}></div>
                                    <div className="psd-column" style={{height: '75%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PropertySellerDashboard;
