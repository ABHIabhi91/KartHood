import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const user = location.state?.user ||
                JSON.parse(localStorage.getItem('user') || 'null');
    const userType = localStorage.getItem('userType');

    React.useEffect(() => {
        if (!user || userType !== 'Resident') navigate('/login');
    }, [user, userType, navigate]);

    if (!user) return <div className="usd-loading">Loading...</div>;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        navigate('/');
    };

    // Dashboard stats cards
    const dashboardStats = [
        {
            title: 'Active Orders',
            value: '3',
            subtitle: 'In progress',
            icon: '📦',
            color: 'usd-blue'
        },
        {
            title: 'This Month',
            value: '₹12,450',
            subtitle: 'Total spent',
            icon: '💳',
            color: 'usd-green'
        },
        {
            title: 'Saved',
            value: '₹2,180',
            subtitle: 'With offers',
            icon: '💰',
            color: 'usd-orange'
        },
        {
            title: 'Rating',
            value: '4.9',
            subtitle: 'Your rating',
            icon: '⭐',
            color: 'usd-purple'
        }
    ];

    // Quick service shortcuts
    const quickServices = [
        {
            name: 'Find Property',
            icon: '🏠',
            color: 'usd-blue',
            onClick: () => navigate('/resident/properties')
        },
        {
            name: 'Order Food',
            icon: '🍕',
            color: 'usd-green',
            onClick: () => navigate('/resident/food')
        },
        {
            name: 'Bakery',
            icon: '🥖',
            color: 'usd-orange',
            onClick: () => navigate('/resident/bakery')
        },
        {
            name: 'Salon',
            icon: '✂️',
            color: 'usd-purple',
            onClick: () => navigate('/resident/salon')
        }
    ];

    // Recent orders/bookings
    const recentOrders = [
        {
            id: 1,
            service: 'Salon appointment',
            status: 'Tomorrow 3PM',
            type: 'upcoming',
            icon: '✂️',
            color: 'usd-purple'
        },
        {
            id: 2,
            service: 'Food order',
            status: 'Delivered',
            type: 'delivered',
            icon: '🍕',
            color: 'usd-green'
        },
        {
            id: 3,
            service: 'Bakery order',
            status: 'Ready for pickup',
            type: 'ready',
            icon: '🥖',
            color: 'usd-orange'
        }
    ];

    // Announcements
    const communityAnnouncements = [
        {
            id: 1,
            title: 'Monthly maintenance due',
            description: 'Please pay your maintenance fees by the 30th of this month',
            time: '2 hours ago',
            icon: '💰'
        },
        {
            id: 2,
            title: 'New restaurant opened in Tower B',
            description: 'A new South Indian restaurant has opened on the ground floor',
            time: '1 day ago',
            icon: '🍽️'
        },
        {
            id: 3,
            title: 'Society meeting scheduled',
            description: 'Monthly society meeting on Sunday at 10 AM in the clubhouse',
            time: '2 days ago',
            icon: '🏢'
        }
    ];

    return (
    <div className="usd-dashboard-wrapper">
        {/* Sidebar Navigation */}
        <aside className="usd-sidebar">
            <nav className="usd-sidebar-nav">
                <div className="usd-sidebar-group">
                    <div className="usd-sidebar-link usd-active">
                        <span className="usd-sidebar-icon">📊</span>
                        <span>Dashboard</span>
                    </div>
                    <div className="usd-sidebar-link" onClick={() => navigate('/resident/properties')}>
                        <span className="usd-sidebar-icon">🏠</span>
                        <span>Properties</span>
                    </div>
                    <div className="usd-sidebar-link" onClick={() => navigate('/resident/services')}>
                        <span className="usd-sidebar-icon">🛎️</span>
                        <span>Services</span>
                    </div>
                    <div className="usd-sidebar-link" onClick={() => navigate('/resident/orders')}>
                        <span className="usd-sidebar-icon">📦</span>
                        <span>Orders</span>
                    </div>
                    <div className="usd-sidebar-link" onClick={() => navigate('/resident/profile')}>
                        <span className="usd-sidebar-icon">👤</span>
                        <span>Profile</span>
                    </div>
                </div>
                <div className="usd-sidebar-group">
                    <div className="usd-sidebar-link">
                        <span className="usd-sidebar-icon">⚙️</span>
                        <span>Settings</span>
                    </div>
                    <div className="usd-sidebar-link">
                        <span className="usd-sidebar-icon">📞</span>
                        <span>Support</span>
                    </div>
                </div>
            </nav>
        </aside>

        {/* Top Bar */}
        <header className="usd-header">
            <div className="usd-header-content">
                <div className="usd-header-left">
                    <div className="usd-logo">🏠</div>
                    <div className="usd-header-title">
                        <h1>Kart Hood</h1>
                        <span>Resident Portal</span>
                    </div>
                </div>
                <nav className="usd-header-nav">
                    <div className="usd-header-btn usd-active">Dashboard</div>
                    <div className="usd-header-btn" onClick={() => navigate('/resident/properties')}>Properties</div>
                    <div className="usd-header-btn" onClick={() => navigate('/resident/services')}>Services</div>
                    <div className="usd-header-btn" onClick={() => navigate('/resident/orders')}>Orders</div>
                    <div className="usd-header-btn" onClick={() => navigate('/resident/profile')}>Profile</div>
                </nav>
                <button className="usd-logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </header>

        {/* Main Content */}
        <main className="usd-main-content">
            {/* Welcome Banner and Actions */}
            <section className="usd-welcome-section">
                <div>
                    <h2>Welcome back, {user.name}! 👋</h2>
                    <p>Discover services, connect with neighbors, and manage your society life effortlessly.</p>
                </div>
                <div className="usd-welcome-actions">
                    <button onClick={() => navigate('/resident/services')} className="usd-action-btn usd-action-primary">🛎️ Explore Services</button>
                    <button onClick={() => navigate('/properties')} className="usd-action-btn usd-action-secondary">🏠 Find Property</button>
                </div>
            </section>

            {/* Stats Overview */}
            <section className="usd-stats-row">
                {dashboardStats.map((stat, idx) => (
                    <div key={idx} className={`usd-stat-card ${stat.color}`}>
                        <div className="usd-stat-icon">{stat.icon}</div>
                        <div>
                            <div className="usd-stat-value">{stat.value}</div>
                            <div className="usd-stat-title">{stat.title}</div>
                            <div className="usd-stat-subtitle">{stat.subtitle}</div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Quick Services */}
            <section className="usd-services-strip">
                {quickServices.map((srv, idx) =>
                    <div key={idx} className={`usd-service-card ${srv.color}`} onClick={srv.onClick}>
                        <div className="usd-service-icon">{srv.icon}</div>
                        <div className="usd-service-label">{srv.name}</div>
                        <div className="usd-service-arrow">→</div>
                    </div>
                )}
            </section>

            {/* Orders & Announcements */}
            <div className="usd-cards-grid">
                {/* Orders */}
                <section className="usd-card">
                    <div className="usd-card-title-row">
                        <h3>Recent Orders & Bookings</h3>
                        <button className="usd-view-all-btn" onClick={() => navigate('/resident/orders')}>View All</button>
                    </div>
                    {recentOrders.map((order) => (
                        <div key={order.id} className="usd-order-row">
                            <div className={`usd-order-icon ${order.color}`}>{order.icon}</div>
                            <div>
                                <div className="usd-order-title">{order.service}</div>
                                <div className="usd-order-status">{order.status}</div>
                            </div>
                            <div>
                                <button className="usd-order-btn">View</button>
                            </div>
                        </div>
                    ))}
                </section>
                {/* Announcements */}
                <section className="usd-card">
                    <div className="usd-card-title-row">
                        <h3>Community Announcements</h3>
                        <button className="usd-view-all-btn" onClick={() => navigate('/resident/announcements')}>View All</button>
                    </div>
                    {communityAnnouncements.map((ann) => (
                        <div key={ann.id} className="usd-ann-row">
                            <div className="usd-ann-icon">{ann.icon}</div>
                            <div>
                                <div className="usd-ann-title">{ann.title}</div>
                                <div className="usd-ann-desc">{ann.description}</div>
                                <div className="usd-ann-ts">{ann.time}</div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    </div>
    );
};

export default UserDashboard;
