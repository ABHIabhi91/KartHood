import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // The user object is passed from the LandingPage during redirection
    const user = location.state?.user;

    // MODIFICATION START: Moved the redirect logic inside the hook
    // This hook will run when the component mounts or when user/navigate changes.
    React.useEffect(() => {
        // If a user tries to access this page directly without being logged in,
        // redirect them to the login page.
        if (!user) {
            console.log("No user found, redirecting to login.");
            navigate('/login');
        }
    }, [user, navigate]); // Dependencies for the effect
    // MODIFICATION END

    // This early return prevents rendering the rest of the component if there's no user.
    // It's safe to do this after all hooks have been called.
    if (!user) {
        return (
            <div className="loading-redirect">
                <p>Please log in to view your dashboard. Redirecting...</p>
            </div>
        );
    }

    const handleLogout = () => {
        // Clear user data from storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Navigate back to the login page
        navigate('/');
    };

    // Mock data for recent orders and announcements
    const recentBookings = [
        { id: 1, text: 'Salon appointment - Tomorrow 3PM', status: 'Upcoming' },
        { id: 2, text: 'Food order from Food Fiesta - Delivered', status: 'Delivered' },
        { id: 3, text: 'Bakery order from Sweet Crumbs - Canceled', status: 'Canceled' },
    ];

    const communityAnnouncements = [
        { id: 1, text: 'Monthly society maintenance is due on the 10th.' },
        { id: 2, text: 'A new Italian restaurant, "Pasta Paradise," has opened in Tower B.' },
        { id: 3, text: 'The swimming pool will be closed for cleaning this weekend.' },
    ];

    return (
        <div className="dashboard-container">
            {/* Header Section */}
            <header className="dashboard-header">
                <div className="welcome-message">
                    <h2>Welcome, {user.name}!</h2>
                    <p>Tower: {user.tower}, Flat: {user.flatNumber}</p>
                </div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>

            {/* Quick Services Section */}
            <section className="dashboard-section">
                <h3>Quick Services</h3>
                <div className="quick-services-grid">
                    <div className="service-card" onClick={() => navigate('/services/properties')}>
                        <span className="service-icon">🏠</span>
                        <p>Find Property</p>
                    </div>
                    <div className="service-card" onClick={() => navigate('/services/restaurants')}>
                        <span className="service-icon">🍔</span>
                        <p>Order Food</p>
                    </div>
                    <div className="service-card" onClick={() => navigate('/services/bakeries')}>
                        <span className="service-icon">🍰</span>
                        <p>Bakery</p>
                    </div>
                    <div className="service-card" onClick={() => navigate('/services/salons')}>
                        <span className="service-icon">✂️</span>
                        <p>Salon</p>
                    </div>
                </div>
            </section>

            {/* Recent Orders/Bookings Section */}
            <section className="dashboard-section">
                <h3>Recent Orders & Bookings</h3>
                <ul className="info-list">
                    {recentBookings.map(item => (
                        <li key={item.id} className={`list-item item-${item.status.toLowerCase()}`}>
                            <span>{item.text}</span>
                            <span className="item-status">{item.status}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Community Announcements Section */}
            <section className="dashboard-section">
                <h3>Community Announcements</h3>
                <ul className="info-list">
                    {communityAnnouncements.map(item => (
                        <li key={item.id} className="list-item">
                            {item.text}
                        </li>
                    ))}
                </ul>
            </section>

            <footer className="dashboard-footer">
                <p>Kart Hood - Your Community Hub</p>
            </footer>
        </div>
    );
};

export default UserDashboard;
