import React, { useEffect, useState } from 'react';
import API from '../api/api';

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/overview')
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading overview...</p>;

  if (!stats) return <p>No overview data available.</p>;

  return (
    <div className="container">
      <h3>Overview</h3>
      <ul>
        <li>Total Contracts: {stats.totalContracts}</li>
        <li>Due Contracts: {stats.dueContracts}</li>
        <li>Expired Contracts: {stats.expiredContracts}</li>
        <li>Renewed Contracts: {stats.renewedContracts}</li>
        {/* Add more stats as needed */}
      </ul>
    </div>
  );
};

export default Overview;
