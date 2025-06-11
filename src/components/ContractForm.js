import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import './ContractForm.css'; // Importing the CSS file for styling

const initialForm = {
  customer: { name: '', email: '' },
  company: '',
  idNumber: '',
  date: '',
  status: 'Due',
  confirmation: '',
  responsiblePerson: { name: '', email: '' },
  amount: '',
  balance: '',
  source: '',
  contractId: '',
  approvals: 0,
};

const ContractForm = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      API.get(`/contracts/${id}`)
        .then(res => {
          const data = res.data;
          const dateString = data.date ? new Date(data.date).toISOString().substr(0, 10) : '';
          setForm({ ...data, date: dateString });
        })
        .catch(() => setError('Failed to load contract'));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customer.name || !form.company || !form.contractId) {
      setError('Please fill in required fields: Customer Name, Company, Contract ID.');
      return;
    }
    try {
      if (id) {
        await API.put(`/contracts/${id}`, form);
      } else {
        await API.post('/contracts', form);
      }
      navigate('/dashboard/contracts');
    } catch {
      setError('Failed to save contract');
    }
  };

  return (
    <div className="contracts-container">
      <h3>{id ? 'Edit' : 'Add'} Contract</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Customer Info</legend>
          <input
            name="customer.name"
            value={form.customer.name}
            onChange={handleChange}
            placeholder="Customer Name *"
            required
          />
          <input
            name="customer.email"
            value={form.customer.email}
            onChange={handleChange}
            placeholder="Customer Email"
            type="email"
          />
        </fieldset>

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company *"
          required
        />
        <input
          name="idNumber"
          value={form.idNumber}
          onChange={handleChange}
          placeholder="ID Number"
        />
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Date"
          type="date"
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Due">Due</option>
          <option value="Expired">Expired</option>
          <option value="Renewed">Renewed</option>
        </select>

        <input
          name="confirmation"
          value={form.confirmation}
          onChange={handleChange}
          placeholder="Confirmation"
        />

        <fieldset>
          <legend>Responsible Person</legend>
          <input
            name="responsiblePerson.name"
            value={form.responsiblePerson.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="responsiblePerson.email"
            value={form.responsiblePerson.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />
        </fieldset>

        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          step="0.01"
        />
        <input
          name="balance"
          value={form.balance}
          onChange={handleChange}
          placeholder="Balance"
          type="number"
          step="0.01"
        />
        <input
          name="source"
          value={form.source}
          onChange={handleChange}
          placeholder="Source"
        />
        <input
          name="contractId"
          value={form.contractId}
          onChange={handleChange}
          placeholder="Contract ID *"
          required
        />
        <input
          name="approvals"
          value={form.approvals}
          onChange={handleChange}
          placeholder="Approvals"
          type="number"
        />

        <button className="add-btn" type="submit">{id ? 'Update' : 'Add'} Contract</button>
      </form>
    </div>
  );
};

export default ContractForm;
