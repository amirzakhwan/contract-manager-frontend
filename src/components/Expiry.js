import React, { useEffect, useState } from 'react';
import API from '../api/api';
import './ExpiryPage.css'; // Import the updated CSS styles

const ExpiryPage = () => {
  const [expiries, setExpiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    API.get('/expiry')
      .then(res => setExpiries(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to load expiring contracts');
      })
      .finally(() => setLoading(false));
  }, []);

  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return Math.floor((expiry - today) / (1000 * 60 * 60 * 24));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredExpiries = expiries.filter(
    (expiry) =>
      expiry.contractId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expiry.customer?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading expiring contracts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="contracts-container">
      <h3>Expiring Contracts</h3>
      
      <input
        type="text"
        placeholder="Search by contract ID or customer name"
        value={searchTerm}
        onChange={handleSearch}
      />
      
      <div className="contracts-table-container">
        <table className="contracts-table">
          <thead>
            <tr>
              <th>Contract ID</th>
              <th>Customer</th>
              <th>Expiry Date</th>
              <th>Days Left</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpiries.length > 0 ? (
              filteredExpiries.map(e => {
                const daysLeft = calculateDaysLeft(e.date);
                const isNearExpiry = daysLeft < 7;
                return (
                  <tr key={e._id} style={{ backgroundColor: isNearExpiry ? '#ffeb3b' : '#fff' }}>
                    <td>{e.contractId}</td>
                    <td>{e.customer?.name}</td>
                    <td>{new Date(e.date).toLocaleDateString()}</td>
                    <td>{daysLeft}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">No expiring contracts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpiryPage;

