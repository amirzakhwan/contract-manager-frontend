import React, { useState, useContext } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Register.css'; // Import styling for the register page

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form); // Send registration request
      const { user, token } = res.data;

      // Store token in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Login user by updating the AuthContext
      login(user, token);

      // Redirect to dashboard after successful registration
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h1>FLANKER</h1>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
          className="input-field"
        />
        <input
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          type="password"
          required
          className="input-field"
        />
        <button type="submit" className="btn-primary" style={{ marginTop: '15px' }}>
          Register
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <p>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;

