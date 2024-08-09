// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import '../index.css'; // Ensure this is the path to your CSS file

export const Signup = () => {
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = user;
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const result = await signup(email, password);
        setMessage(result); // Display the message from the API
        if (result.toLowerCase().includes('successfully') ) {
          setTimeout(() => navigate('/signin'), 2000); // Redirect to signin after 2 seconds if successful
        }
      } catch (error) {
        setMessage(error.message); // Display the error message from API
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Sign Up</h2>
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
          <div className="auth-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className="auth-button" type="submit">
            Submit
          </button>
        </form>
        <p>Already have an account? <a href="/signin">Login</a></p>
      </div>
    </div>
  );
};


