import React, { useState } from 'react';
import Layout from '../Components/Layout'
import axios from 'axios';
import '../pages/csspages/Login.css';
import { useNavigate } from 'react-router-dom'; 

const login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'farmer' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', formData);
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      localStorage.setItem('role',formData.role);
      window.location.href = '/';
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="form-title">Login</h1>

        <label htmlFor="role" className="form-label">Select Your Role:</label>
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          className="form-input"
        >
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>

        <label htmlFor="email" className="form-label">Enter your Email / PhoneNumber:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          placeholder="Email @gmail.com / XXXXXXXXXX"
          required
        />

        <label htmlFor="password" className="form-label">Enter your Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          placeholder="Password"
          required
        />

        <button type="submit" className="form-button">Login</button>
      </form>
    </Layout>
  )
}//dont change the name of function while building

export default login
