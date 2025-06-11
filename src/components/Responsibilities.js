import React, { useEffect, useState } from 'react';
import API from '../api/api';
import './Responsibilities.css'; // Import the CSS file for styling

const Responsibilities = () => {
  const [responsibilities, setResponsibilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/responsibilities')
      .then(res => {
        console.log(res.data); // Log the API response to check the data structure
        setResponsibilities(res.data);
      })
      .catch(err => {
        setError('Failed to load responsibilities. Please try again later.');
        console.error(err); // Log any errors to the console for debugging
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading responsibilities...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="contracts-container">
      <h3>Responsibilities</h3>
      <div className="contracts-table-container">
        <table className="contracts-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>ID Number</th>
              <th>Responsible Person</th>
              <th>Company Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {responsibilities.length > 0 ? (
              responsibilities.map(r => (
                <tr key={r._id}>
                  <td>{r.customer_name}</td>
                  <td>{r.id_number}</td>
                  <td>{r.responsible_person}</td>
                  <td>{r.company_name}</td>
                  <td>{r.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No responsibilities found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Responsibilities;

