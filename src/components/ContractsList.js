import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';
import './ContractsList.css'; // Import the CSS file

const ContractsList = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await API.get('/contracts');
        setContracts(res.data);
      } catch (err) {
        console.error('Error fetching contracts:', err);
        setError('Failed to fetch contracts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  if (loading) return <p>Loading contracts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="contracts-container">
      <h3>Contracts</h3>
      <Link to="/dashboard/contracts/new">
        <button className="add-btn">Add New Contract</button>
      </Link>
      <table className="contracts-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Company</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map(c => (
            <tr key={c._id}>
              <td>{c.customer?.name}</td>
              <td>{c.company}</td>
              <td>{c.status}</td>
              <td>{c.amount}</td>
              <td>{c.balance}</td>
              <td>
                <Link to={`/dashboard/contracts/edit/${c._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractsList;


