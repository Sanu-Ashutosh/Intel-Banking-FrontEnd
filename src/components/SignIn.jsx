// src/components/Signin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../services/authService';
import '../index.css'; // Ensure this is the path to your CSS file

export const Signin = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    try {
      const result = await signin(email, password);
      setMessage('Signin successful');
      localStorage.setItem('user', JSON.stringify(result)); // Store result as JSON string
      setTimeout(() => navigate('/home'), 2000); // Redirect to home after 2 seconds
    } catch (error) {
      setMessage('Signin failed: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Sign In</h2>
        {message && <div className={`auth-message ${message.toLowerCase().includes('failed') ? 'auth-error' : 'auth-success'}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="auth-button" type="submit">
            Sign In
          </button>
        </form>
        <p>Don't have an account? <a href="/signup">Register</a></p>
      </div>
    </div>
  );
};


