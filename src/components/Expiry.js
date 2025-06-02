import React, { useEffect, useState } from 'react';
import API from '../api/api';

const Expiry = () => {
  const [expiries, setExpiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/expiry')
      .then(res => setExpiries(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading expiring contracts...</p>;

  return (
    <div className="container">
      <h3>Expiry</h3>
      <ul>
        {expiries.map(e => (
          <li key={e._id}>
            Contract: {e.contractId} — Customer: {e.customer?.name} — Expiry Date: {new Date(e.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expiry;
