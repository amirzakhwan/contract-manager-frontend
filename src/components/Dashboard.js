import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <nav>
        <span>Welcome, {user?.name}</span> |{' '}
        <Link to="/dashboard/contracts">Contracts</Link> |{' '}
        <button onClick={handleLogout}>Logout</button>
        <nav> 
        <Link to="/dashboard/overview">Overview</Link> |{' '}
        <Link to="/dashboard/contracts">Contracts</Link> |{' '}
        <Link to="/dashboard/responsibilities">Responsibilities</Link> |{' '}
        <Link to="/dashboard/approvals">Approvals</Link> |{' '}
        <Link to="/dashboard/expiry">Expiry</Link> |{' '}
        <button onClick={handleLogout}>Logout</button>
</nav>

      </nav>
      <main><Outlet /></main>
    </div>
  );
};

export default Dashboard;
