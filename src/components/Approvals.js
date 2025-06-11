import React, { useEffect, useState } from 'react';
import API from '../api/api';
import './Approvals.css';  // Ensure you import the corresponding CSS file

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

  // Calculate the number of contracts in each stage
  const countStage = (stage) => approvals.filter(a => a.status === stage).length;

  const totalContracts = approvals.length;
  const contractApprovals = countStage('Approval');
  const contractReviews = countStage('Review');
  const contractNegotiations = countStage('Negotiation');

  return (
    <div className="contracts-container">
      <h3>Contract Approvals</h3>

      {/* Statistics Section */}
      <div className="statistics">
        <h4>Contract Overview</h4>
        <p><span>Contract Approvals:</span> {contractApprovals}</p>
        <p><span>Contract Reviews:</span> {contractReviews}</p>
        <p><span>Contract Negotiations:</span> {contractNegotiations}</p>
        <p><span>Total Contracts:</span> {totalContracts}</p>
      </div>

      {/* List of Approvals */}
      <div className="contracts-table-container">
        <table className="contracts-table">
          <thead>
            <tr>
              <th>Approver Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Approval Date</th>
            </tr>
          </thead>
          <tbody>
            {approvals.length === 0 ? (
              <tr>
                <td colSpan="4">No approvals found.</td>
              </tr>
            ) : (
              approvals.map(a => (
                <tr key={a._id}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td className="status">{a.status}</td>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approvals;
