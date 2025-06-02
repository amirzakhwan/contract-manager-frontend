import React, { useEffect, useState } from 'react';
import API from '../api/api';

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/approvals')
      .then(res => setApprovals(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading approvals...</p>;

  return (
    <div className="container">
      <h3>Approvals</h3>
      <ul>
        {approvals.map(a => (
          <li key={a._id}>{a.name} — {a.email} — Status: {a.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Approvals;
