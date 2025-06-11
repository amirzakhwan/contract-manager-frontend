import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle state for sidebar
  const [activePage, setActivePage] = useState('/dashboard'); // Active page state for sidebar
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handlePageChange = (page) => {
    setActivePage(page); // Set the active page on click
    navigate(page); // Navigate to the clicked page
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <button className="sidebar-toggle" onClick={handleSidebarToggle}>
            {isSidebarOpen ? '←' : '→'}
          </button>
          {isSidebarOpen && <h2>Flanker</h2>} {/* Only show title if sidebar is open */}
        </div>
        <ul>
          <li>
            <Link
              to="/dashboard"
              className={`sidebar-link ${activePage === '/dashboard' ? 'active' : ''}`}
              onClick={() => handlePageChange('/dashboard')}
            >
              {isSidebarOpen && 'Dashboard'}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/contracts"
              className={`sidebar-link ${activePage === '/dashboard/contracts' ? 'active' : ''}`}
              onClick={() => handlePageChange('/dashboard/contracts')}
            >
              {isSidebarOpen && 'Contracts'}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/responsibilities"
              className={`sidebar-link ${activePage === '/dashboard/responsibilities' ? 'active' : ''}`}
              onClick={() => handlePageChange('/dashboard/responsibilities')}
            >
              {isSidebarOpen && 'Responsibilities'}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/approvals"
              className={`sidebar-link ${activePage === '/dashboard/approvals' ? 'active' : ''}`}
              onClick={() => handlePageChange('/dashboard/approvals')}
            >
              {isSidebarOpen && 'Approvals'}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/expiry"
              className={`sidebar-link ${activePage === '/dashboard/expiry' ? 'active' : ''}`}
              onClick={() => handlePageChange('/dashboard/expiry')}
            >
              {isSidebarOpen && 'Expiry'}
            </Link>
          </li>
        </ul>
        {/* Logout Button at the Bottom */}
        <button className="sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="search-btn">Search</button>
          </div>
          <div className="profile-section">
            <span>{user?.name}</span>
            {/* Round Profile Picture */}
            <img
              src={user?.profilePicture || 'https://via.placeholder.com/40'}
              alt="Profile"
              className="profile-picture"
            />
          </div>
        </header>

        {/* Overview Data on Dashboard Only */}
        {activePage === '/dashboard' && (
          <div className="overview">
            <h2>Overview</h2>
            <div className="overview-item">
              <h3>Contracts</h3>
              <p>5 Active Contracts</p>
            </div>
            <div className="overview-item">
              <h3>Responsibilities</h3>
              <p>10 Pending Tasks</p>
            </div>
            <div className="overview-item">
              <h3>Approvals</h3>
              <p>3 Pending Approvals</p>
            </div>
            <div className="overview-item">
              <h3>Expiry</h3>
              <p>2 Contracts Expiring Soon</p>
            </div>
          </div>
        )}

        <div className="content">
          <Outlet /> {/* Nested Routes (children) will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
