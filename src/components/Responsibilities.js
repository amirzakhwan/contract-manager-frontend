import React, { useEffect, useState } from 'react';
import API from '../api/api';

const Responsibilities = () => {
  const [responsibilities, setResponsibilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/responsibilities')
      .then(res => setResponsibilities(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading responsibilities...</p>;

  return (
    <div className="container">
      <h3>Responsibilities</h3>
      <ul>
        {responsibilities.map(r => (
          <li key={r._id}>{r.name} — {r.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Responsibilities;
