import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

const ContractsList = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await API.get('/contracts');
        setContracts(res.data);
      } catch (err) {
        console.error('Error fetching contracts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  if (loading) return <p>Loading contracts...</p>;

  return (
    <div>
      <h3>Contracts</h3>
      <Link to="/dashboard/contracts/new">
        <button>Add New Contract</button>
      </Link>
      <table border="1" cellPadding="5">
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
                  <button>Edit</button>
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

