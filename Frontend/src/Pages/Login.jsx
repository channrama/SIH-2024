import React, { useState } from 'react';
import '../pages/csspages/Login.css';
import Layout from '../Components/Layout';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dummy authentication logic
    const dummyUser = {
      email: 'lakshr686@gmail.com',
      password: '1SI22CS089'
    };

    if (loginData.email === dummyUser.email && loginData.password === dummyUser.password) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(loginData));
      alert('Login successful');
      navigate('/'); // Redirect to the home page
    } else {
      alert('Invalid email or password');
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
          value={loginData.role}
          onChange={handleChange}
          className="form-input"
        >
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>

        <label htmlFor="email" className="form-label">Enter your Email/PhoneNumber:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={loginData.email}
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
          value={loginData.password}
          onChange={handleChange}
          className="form-input"
          placeholder="Password"
          required
        />

        <button type="submit" className="form-button">Login</button>
      </form>
    </Layout>
  );
};

export default Login;
