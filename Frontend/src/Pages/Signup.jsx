import React, { useState } from 'react';
import './signup.css'; // Assuming you have a separate CSS file for Signup
import Layout from '../Components/Layout';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'farmer', // Default value for role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Dummy authentication logic
    const userExists = localStorage.getItem('user');
    if (userExists) {
      alert('User already exists. Please log in.');
      navigate('/login'); // Redirect to login page
      return;
    }

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(signupData));
    alert('Signup successful');
    navigate('/'); // Redirect to home page after successful signup
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="form-title">Signup</h1>

        <label htmlFor="role" className="form-label">Select Your Role:</label>
        <select
          name="role"
          id="role"
          value={signupData.role}
          onChange={handleChange}
          className="form-input"
        >
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>

        <label htmlFor="email" className="form-label">Enter your Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={signupData.email}
          onChange={handleChange}
          className="form-input"
          placeholder="Email @gmail.com"
          required
        />

        <label htmlFor="password" className="form-label">Enter your Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={signupData.password}
          onChange={handleChange}
          className="form-input"
          placeholder="Password"
          required
        />

        <label htmlFor="confirmPassword" className="form-label">Confirm your Password:</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={signupData.confirmPassword}
          onChange={handleChange}
          className="form-input"
          placeholder="Confirm Password"
          required
        />

        <button type="submit" className="form-button">Signup</button>
      </form>
    </Layout>
  );
};

export default Signup;
